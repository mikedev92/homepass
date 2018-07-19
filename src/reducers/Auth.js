// @flow
import { type Action } from '../actions/types';

export type State = {
	loggedIn: boolean,
	access_token: ?string,
	refresh_token: ?string,
	id_token: ?string,
	token_type: ?string,
	enteredEmail: ?string,
	codeInvalid: boolean
};

const initialState = {
	loggedIn: false,
	access_token: null,
	refresh_token: null,
	id_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0OTkyNTk5ODAsImV4cCI6MTUzMDc5NTk4MCwiYXVkIjoibUF6eEZ0QlZnWWlTWFRpQlBJWThNWGdBZkZMQjdMOVYiLCJpc3MiOiJodHRwczovL2hvbWVwYXNzLmF1dGgwLmNvbS8iLCJzdWIiOiJlbWFpbHw1OTVhZTg3NzdjZDMxMjYyOTdlZDIyMGUifQ.ONIU16SpHO3_mTzV6uix-ySJrX9p_8YsHd-R369xV5M',
	token_type: null,
	enteredEmail: null,
	codeInvalid: false
};

export default (state: State = initialState, action: Action): State => {
	switch (action.type) {
		case 'LOGIN_SUCCESS': {
			return {
				...state,
				loggedIn: true,
				access_token: action.access_token,
				refresh_token: action.refresh_token,
				id_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0OTkyNTk5ODAsImV4cCI6MTUzMDc5NTk4MCwiYXVkIjoibUF6eEZ0QlZnWWlTWFRpQlBJWThNWGdBZkZMQjdMOVYiLCJpc3MiOiJodHRwczovL2hvbWVwYXNzLmF1dGgwLmNvbS8iLCJzdWIiOiJlbWFpbHw1OTVhZTg3NzdjZDMxMjYyOTdlZDIyMGUifQ.ONIU16SpHO3_mTzV6uix-ySJrX9p_8YsHd-R369xV5M',
				token_type: action.token_type
			};
		}
		case 'PASSWORDLESS_LOGIN_WITH_EMAIL': {
			return {
				...state,
				enteredEmail: action.email,
				codeInvalid: false
			};
		}
		case 'CODE_INVALID': {
			return {
				...state,
				codeInvalid: true
			};
		}
		default:
			return state;
	}
};
