// @flow
import Navigator from '../components/Navigator';
import type { Action } from '../actions/types';

export type State = mixed;

export default (state: State, action: Action) => (
  Navigator.router.getStateForAction(action, state) || state
);
