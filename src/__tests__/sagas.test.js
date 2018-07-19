// @flow
import { put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { completeLoginWithProfile, loginWithConnection } from '../sagas';

describe('Saga: sagas', () => {
  describe('#completeLoginWithProfile', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should send out login success and reset navigator to the app', () => {
      const auth0MockResult = { mock: 'data' };
      const gen = completeLoginWithProfile(auth0MockResult);
      expect(gen.next().value).toEqual(put({ type: 'LOGIN_SUCCESS', ...auth0MockResult }));
      expect(gen.next().value).toEqual(put(NavigationActions.reset()));
      expect(gen.next().done).toEqual(true);
    });
  });
  describe('#loginWithConnection', () => {
    it('should call auth0 web auth with the connection passed', () => {
      const auth0Mock = {
        webAuth: {
          authorize: jest.fn(),
        },
      };
      const gen = loginWithConnection(auth0Mock, {
        type: 'LOGIN_WITH_CONNECTION',
        connection: 'facebook',
      });
      gen.next();
      expect(auth0Mock.webAuth.authorize).toHaveBeenCalledTimes(1);
    });
  });
});
