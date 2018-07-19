// @flow
import type { LoginWithConnectionAction, AuthConnection, LogoutAction } from './types';

export function requestLoginWithConnection(connection: AuthConnection): LoginWithConnectionAction {
  return {
    type: 'LOGIN_WITH_CONNECTION',
    connection,
  };
}

export function logout(): LogoutAction {
  return { type: 'LOGOUT' };
}
