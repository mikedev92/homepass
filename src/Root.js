// @flow

import React, { Component } from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import CodePush from 'react-native-code-push';
import { ApolloProvider } from 'react-apollo';
import { StyleProvider } from 'native-base';
import { persistStore } from 'redux-persist';
import getHomepassTheme from './theme';
import setupClient, { applyNetworkMiddleware } from './utils/HomepassApolloClient';
import setupStore from './utils/setupStore';
import App from './App';
import { PERSIST } from './config';

class Root extends Component {
	constructor() {
		super();
		this.theme = getHomepassTheme();
		this.client = setupClient();
		this.store = setupStore(this.client);
		applyNetworkMiddleware(this.client, this.store);
	}

	state = {
		loading: PERSIST,
		syncMessage: '',
		progress: null
	};

	componentWillMount() {
		if (PERSIST) {
			this.persistor = persistStore(this.store, { storage: AsyncStorage }, () => this.setState({ loading: false }));
		}
	}

	persistor: Object;

	codePushStatusDidChange(syncStatus) {
		switch (syncStatus) {
			case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
				return this.setState({ syncMessage: 'Checking for update.' });
			case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
				return this.setState({ syncMessage: 'Downloading package.' });
			case CodePush.SyncStatus.AWAITING_USER_ACTION:
				return this.setState({ syncMessage: 'Awaiting user action.' });
			case CodePush.SyncStatus.INSTALLING_UPDATE:
				return this.setState({ syncMessage: 'Installing update.' });
			case CodePush.SyncStatus.UP_TO_DATE:
				return this.setState({ syncMessage: 'App up to date.', progress: null });
			case CodePush.SyncStatus.UPDATE_IGNORED:
				return this.setState({ syncMessage: 'Update cancelled by user.', progress: null });
			case CodePush.SyncStatus.UPDATE_INSTALLED:
				return this.setState({
					syncMessage: 'Update installed and will be applied on restart.',
					progress: null
				});
			case CodePush.SyncStatus.UNKNOWN_ERROR:
				return this.setState({ syncMessage: 'An unknown error occurred.', progress: null });
			default:
				return null;
		}
	}

	codePushDownloadDidProgress(progress) {
		this.setState({ progress });
	}

	client: mixed;
	store: Object;
	theme: Object;

	render() {
		if (this.state.loading) {
			return <View />;
		}

		if (this.state.progress) {
			const fractionDownloaded = this.state.progress.receivedBytes / this.state.progress.totalBytes;
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ textAlign: 'center', fontSize: 50 }}>
						{Math.floor(fractionDownloaded * 100)}%
					</Text>
					<Text style={{ textAlign: 'center', fontSize: 50 }}>Downloaded</Text>
				</View>
			);
		}

		return (
			<ApolloProvider client={this.client} store={this.store}>
				<StyleProvider style={this.theme}>
					<App />
				</StyleProvider>
			</ApolloProvider>
		);
	}
}

export default CodePush({
	checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
	installMode: CodePush.InstallMode.IMMEDIATE,
	updateDialog: true
})(Root);
