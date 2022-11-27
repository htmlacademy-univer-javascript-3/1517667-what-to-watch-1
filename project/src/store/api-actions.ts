import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFilmInfo } from '../types/IFilmInfo';
import {
  setLoadedStatusAction,
  initAllFilmsAction,
  setPromoFilmAction,
  setErrorAction,
  requireAuthorization,
  redirectToRoute
} from '../action';
import { AuthorizationStatus } from '../components/private-route/private-route';
import { saveToken, dropToken } from './token';
import { store } from '.';
import { UserData } from '../types/UserData';
import { AuthData } from '../types/AuthData';
import { IState } from '../reducer';

export type AppDispatch = typeof store.dispatch;

export const setInitFilmsInfo = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: IState,
  extra: AxiosInstance
}>(
  'SET_ALL_FILMS',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoadedStatusAction(false));

    api.get<IFilmInfo[]>('films')
      .then((response) => dispatch(initAllFilmsAction(response.data)))
      .catch((error) => dispatch(setErrorAction(error)));

    api.get<IFilmInfo>('promo')
      .then((response) => dispatch(setPromoFilmAction(response.data)))
      .catch((error) => dispatch(setErrorAction(error)));

    dispatch(setLoadedStatusAction(true));
  },
);

export const clearErrorAction = createAsyncThunk(
  'CLEAR_ERROR',
  () => {
    setTimeout(
      () => store.dispatch(setErrorAction(null)),
      2000,
    );
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: IState,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get('/login');
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: IState,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>('/login', { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute('/'));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: IState,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete('/logout');
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute('/'));
  },
);
