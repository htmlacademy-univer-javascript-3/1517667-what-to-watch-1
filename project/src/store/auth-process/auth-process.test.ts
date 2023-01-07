import { authProcess } from './auth-process';
import { IAuthInfo } from './auth-process';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AuthorizationStatus } from '../../components/private-route/private-route';

describe('Reducer: authProcess', () => {
  let state: IAuthInfo;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authError: false
    };
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(authProcess.reducer(state, { type: checkAuthAction.fulfilled.type }))
        .toEqual({ authorizationStatus: AuthorizationStatus.Auth });
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(authProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({ authorizationStatus: AuthorizationStatus.NoAuth });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(authProcess.reducer(state, { type: loginAction.fulfilled.type }))
        .toEqual({ authorizationStatus: AuthorizationStatus.Auth });
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(authProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(authProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });
});
