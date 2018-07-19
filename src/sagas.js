// @flow
import { put, takeLatest, take } from 'redux-saga/effects';
import Auth0 from 'react-native-auth0';
import { NavigationActions } from 'react-navigation';
import uuid from 'uuid';
import type {
  Action,
  LoginWithConnectionAction,
  PasswordlessLoginEmailAction,
  Auth0ClientUpdateAction,
  PasswordlessVerifyCodeEmailAction,
} from './actions/types';

const SCOPE = 'openid offline_access identities email email_verified user_metadata app_metadata';
const AUTH0_DOMAIN = 'homepass.auth0.com';
export function* completeLoginWithProfile(auth0Result: Object): Generator<Action, void, void> {
  yield put({ type: 'LOGIN_SUCCESS', ...auth0Result });
  yield put(
    NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'App' })],
    }),
  );
}

export function* loginWithConnection(
  auth0: any,
  action: LoginWithConnectionAction,
): Generator<*, *, *> {
  try {
    const auth0Result = yield auth0.webAuth.authorize({
      scope: SCOPE,
      connection: action.connection,
    });
    const mapResult = res => ({
      access_token: res.accessToken,
      refresh_token: res.refreshToken,
      id_token: res.idToken,
      token_type: res.tokenType,
    });
    yield* completeLoginWithProfile(mapResult(auth0Result));
  } catch (ex) {
    // ignore
    console.log(ex);
  }
}

export function* attemptCodeEntry(auth0ClientId: string, email: string): Generator<*, *, *> {
  while (true) {
    // eslint-disable-line
    const { code }: PasswordlessVerifyCodeEmailAction = yield take('PASSWORDLESS_VERIFY_CODE');
    const auth0Result = yield fetch(`https://${AUTH0_DOMAIN}/oauth/ro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: auth0ClientId,
        connection: 'email',
        email,
        username: email,
        grant_type: 'password',
        password: code,
        scope: SCOPE,
        device: uuid(),
      }),
    }).then(res => res.json());

    if (
      auth0Result.access_token &&
      auth0Result.refresh_token &&
      auth0Result.id_token &&
      auth0Result.token_type
    ) {
      yield* completeLoginWithProfile(auth0Result);
      return;
    }
    yield put({ type: 'CODE_INVALID' });
  }
}

export function* loginWithEmail(
  auth0ClientId: string,
  action: PasswordlessLoginEmailAction,
): Generator<*, *, *> {
  yield put(NavigationActions.navigate({ routeName: 'EmailEnterCode' }));
  yield fetch(`https://${AUTH0_DOMAIN}/passwordless/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: auth0ClientId,
      connection: 'email',
      email: action.email,
      send: 'code',
      authParams: {
        scope: SCOPE,
      },
    }),
  });
  yield* attemptCodeEntry(auth0ClientId, action.email);
}

export function* setAuth0IdContext(action: Auth0ClientUpdateAction): Generator<*, *, *> {
  if (!action.value) {
    return;
  }
  const clientId = action.value;
  const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId });
  yield takeLatest('LOGIN_WITH_CONNECTION', loginWithConnection, auth0);
  yield takeLatest('PASSWORDLESS_LOGIN_WITH_EMAIL', loginWithEmail, clientId);
}

export default function* rootSaga(): Generator<*, *, *> {
  yield takeLatest('AUTH0_CLIENT_UPDATE', setAuth0IdContext);
}
