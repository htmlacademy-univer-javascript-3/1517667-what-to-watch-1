import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AuthorizationStatus } from '../../components/private-route/private-route';
import { Namespace } from '../../types/Namespace';

interface IAuthInfo {
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  error: string | null;
}

const initialState = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  isDataLoaded: false,
  error: null,
} as IAuthInfo;

export const authProcess = createSlice({
  name: Namespace.AuthInfo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
