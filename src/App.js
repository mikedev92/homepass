// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { ApolloClient } from 'apollo-client';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import Navigator from './components/Navigator';
import { navigationSelector, type State } from './reducers';

type Props = {
	dispatch: Dispatch,
	state: State,
	client: ApolloClient
};

class App extends Component {
	props: Props;
	interval: number;

	render() {
		const { dispatch, state } = this.props;
		return (
			<Navigator
				navigation={addNavigationHelpers({
					dispatch,
					state
				})}
			/>
		);
	}
}

export default compose(withApollo, connect(state => ({ state: navigationSelector(state) })))(App);
