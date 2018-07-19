// @flow
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Text, View, Button } from 'native-base';
import Video from 'react-native-video';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { withNavigation } from 'react-navigation';
import type { AuthConnection } from '../../actions/types';
import { requestLoginWithConnection } from '../../actions/auth';
import LinearGradientBG from './LinearGradientBG';

type Props = {
	data: ApolloData<*>,
	loginWithConnection: (AuthConnection, string) => void,
	auth0ClientUpdate: string => void,
	navigation: Navigation
};

class Welcome extends Component {
	signInWithConnection = (connection: AuthConnection) => async () => {
		this.props.loginWithConnection(connection, get(this.props.data, 'applicationConfig.auth0ClientId'));
	};

	props: Props;
	auth0: any;

	render() {
		const { navigation } = this.props;
		this.props.auth0ClientUpdate(get(this.props.data, 'applicationConfig.auth0ClientId'));
		return (
			<View style={{ flex: 1 }}>
				<Video
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						bottom: 0,
						right: 0
					}}
					repeat
					resizeMode="cover"
					source={require('../../assets/welcome-background.mp4')}
				/>
				<LinearGradientBG>
					<View
						style={{
							flex: 1,
							flexDirection: 'column',
							justifyContent: 'space-between'
						}}
					>
						<View />
						<View style={{ padding: 32 }}>
							<View>
								<Image style={{ width: 50, height: 50, marginBottom: 32 }} source={require('../../assets/homepass-logo.png')} />
								<Text style={{ color: 'white' }} display>
									Welcome to Homepass
								</Text>
							</View>
							<Button style={{ marginTop: 64 }} onPress={this.signInWithConnection('facebook')} facebookPrimary block>
								<Text>Continue with Facebook</Text>
							</Button>
							<Button onPress={() => navigation.navigate('App')} transparent light style={{ marginTop: 18, alignSelf: 'center' }}>
								<Text>Sign in with Email</Text>
							</Button>
						</View>
					</View>
				</LinearGradientBG>
			</View>
		);
	}
}

const WelcomeQuery = gql`
	query WelcomeQuery {
		applicationConfig {
			auth0ClientId
		}
	}
`;

const mapDispatchToProps = (dispatch: Dispatch) => ({
	loginWithConnection: connection => dispatch(requestLoginWithConnection(connection)),
	auth0ClientUpdate: client => dispatch({ type: 'AUTH0_CLIENT_UPDATE', value: client })
});
const connector = connect(null, mapDispatchToProps);

export default compose(graphql(WelcomeQuery), connector, withNavigation)(Welcome);
