// @flow
import ApolloClient, { createNetworkInterface, toIdValue } from 'react-apollo';
import { apolloSelector, authSelector } from '../reducers';
import { API_BASE } from '../config';

const networkInterface = createNetworkInterface({
	uri: API_BASE
});

export default () =>
	new ApolloClient({
		reduxRootSelector: apolloSelector,
		customResolvers: {
			Query: {
				node: (_, args) => toIdValue(args.id)
			}
		},
		networkInterface,
		dataIdFromObject: o => o.id
	});

export function applyNetworkMiddleware(client: any, store: any) {
	client.networkInterface.use([
		{
			applyMiddleware(req, next) {
				const authState = authSelector(store.getState());
				if (!authState.id_token) {
					next();
					return;
				}

				if (!req.options.headers) {
					req.options.headers = {};
				}
				req.options.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0OTkyNTk5ODAsImV4cCI6MTUzMDc5NTk4MCwiYXVkIjoibUF6eEZ0QlZnWWlTWFRpQlBJWThNWGdBZkZMQjdMOVYiLCJpc3MiOiJodHRwczovL2hvbWVwYXNzLmF1dGgwLmNvbS8iLCJzdWIiOiJlbWFpbHw1OTVhZTg3NzdjZDMxMjYyOTdlZDIyMGUifQ.ONIU16SpHO3_mTzV6uix-ySJrX9p_8YsHd-R369xV5M`;
				next();
			}
		}
	]);
}
