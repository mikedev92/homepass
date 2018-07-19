// @flow
import { requestLoginWithConnection, logout } from '../auth';

describe('Actions: Space', () => {
  it('#requestLoginWithConnection', () => {
    const action = requestLoginWithConnection('facebook');
    expect(action).toEqual({
      type: 'LOGIN_WITH_CONNECTION',
      connection: 'facebook',
    });
  });

  it('#logout', () => {
    const action = logout('facebook');
    expect(action).toEqual({
      type: 'LOGOUT',
    });
  });
});
