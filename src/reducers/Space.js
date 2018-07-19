// @flow
import { type Action } from '../actions/types';

export type State = {
  filters: {
    [string]: boolean
  },
}

const initialState = {
  filters: {},
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SET_FILTER': {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.key]: action.value,
        },
      };
    }
    default: return state;
  }
};
