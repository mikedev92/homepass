// @flow
import { setFilter } from '../Space';

describe('Actions: Space', () => {
  it('#setFilter', () => {
    const action = setFilter('MyKey', false);
    expect(action).toEqual({ type: 'SET_FILTER', key: 'MyKey', value: false });
  });
});
