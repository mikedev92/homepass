// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import navigationReducer, { type State as NavigationState } from './navigation';
import type { Action } from '../actions/types';
import authReducer, { type State as AuthState } from './Auth';
import spaceReducer, { type State as SpaceState } from './Space';

export type State = {
  apollo: mixed,
  nav: NavigationState,
  form: mixed,
  auth: AuthState,
  space: SpaceState,
};

export function apolloSelector(state: State) {
  return state.apollo;
}
export function navigationSelector(state: State) {
  return state.nav;
}
export function authSelector(state: State): AuthState {
  return state.auth;
}
export function spaceSelector(state: State): SpaceState {
  return state.space;
}

export default (client: any) => {
  const appReducer = combineReducers({
    apollo: client.reducer(),
    nav: navigationReducer,
    form: formReducer,
    auth: authReducer,
    space: spaceReducer,
  });
  return (state: State, action: Action) => {
    if (action.type === 'LOGOUT') {
      return appReducer(undefined, action);
    }
    return appReducer(state, action);
  };
};
