// @flow
import { type Action } from './types';

export function setFilter(key: string, value: boolean): Action { // eslint-disable-line
  return {
    type: 'SET_FILTER',
    key,
    value,
  };
}
