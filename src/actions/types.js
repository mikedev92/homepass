// @flow

export type AuthConnection = 'facebook' | 'google-oauth2' | 'windowslive' | 'email' | 'sms';
export type LoginWithConnectionAction = {
  type: 'LOGIN_WITH_CONNECTION',
  connection: AuthConnection,
};

export type LoginSuccessAction = {
  type: 'LOGIN_SUCCESS',
  access_token: string,
  expires_in: number,
  refresh_token: string,
  id_token: string,
  token_type: string,
};

export type LogoutAction = {
  type: 'LOGOUT',
}

export type PasswordlessLoginEmailAction = {
  type: 'PASSWORDLESS_LOGIN_WITH_EMAIL',
  email: string,
};

export type PasswordlessVerifyCodeEmailAction = {
  type: 'PASSWORDLESS_VERIFY_CODE',
  code: string,
};

export type Auth0ClientUpdateAction = {
  type: 'AUTH0_CLIENT_UPDATE',
  value: string,
};

export type SetSpaceFilter = {
  type: 'SET_FILTER',
  key: string,
  value: boolean,
}

export type Action =
  | LoginWithConnectionAction
  | PasswordlessVerifyCodeEmailAction
  | PasswordlessLoginEmailAction
  | Auth0ClientUpdateAction
  | LoginSuccessAction
  | SetSpaceFilter;
