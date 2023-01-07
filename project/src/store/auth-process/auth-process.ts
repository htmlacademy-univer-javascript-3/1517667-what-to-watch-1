import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AuthorizationStatus } from '../../components/private-route/private-route';
import { Namespace } from '../../types/Namespace';

export interface IAuthInfo {
  authorizationStatus: AuthorizationStatus;
  authError: boolean;
}

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authError: false,
} as IAuthInfo;

export const authProcess = createSlice({
  name: Namespace.AuthInfo,
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.authError = false;
    }
  },
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
        state.authError = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { resetAuthError } = authProcess.actions;
