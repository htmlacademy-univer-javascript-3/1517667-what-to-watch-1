import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFilmInfo } from '../types/IFilmInfo';
import {
  setLoadedStatusAction,
  initAllFilmsAction,
  setPromoFilmAction,
  setErrorAction
} from '../action';
import { store } from '.';
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
