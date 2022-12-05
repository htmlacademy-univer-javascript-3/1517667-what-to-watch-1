import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFilmInfo } from '../types/IFilmInfo';
import { saveToken, dropToken } from './token';
import { store } from '.';
import { UserData } from '../types/UserData';
import { AuthData } from '../types/AuthData';
import { State } from '../types/state';
import { IComment, ICommentsInfo } from '../types/IComment';
import { ISendComment } from '../types/ISendComment';
import { redirectToRoute } from './action';

export type AppDispatch = typeof store.dispatch;

export const setInitFilmsInfo = createAsyncThunk<IFilmInfo[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'SET_ALL_FILMS',
  async (_arg, { dispatch, extra: api }) => {
    const response = await api.get<IFilmInfo[]>('films');
    return response.data;
  },
);

export const setPromoFilmInfo = createAsyncThunk<IFilmInfo, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'SET_PROMO_FILM',
  async (_arg, {dispatch, extra: api}) => {
    const response = await api.get<IFilmInfo>('promo');
    return response.data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get('/login');
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>('/login', {email, password});
    saveToken(token);
    dispatch(redirectToRoute('/'));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete('/logout');
    dropToken();
    dispatch(redirectToRoute('/'));
  },
);

export const fetchFilmAction = createAsyncThunk<IFilmInfo, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'FETCH_CURRENT_FILM',
  async (id, { dispatch, extra: api }) => {
    const response = await api.get<IFilmInfo>(`/films/${id}`);
    return response.data;
  },
);

export const fetchSimilarAction = createAsyncThunk<IFilmInfo[], string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'FETCH_SIMILAR_FILM',
  async (id, { dispatch, extra: api }) => {
    const response = await api.get<IFilmInfo[]>(`/films/${id}/similar`);
    return response.data;
  },
);

export const fetchReviewsAction = createAsyncThunk<ICommentsInfo, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'FETCH_FILM_REVIEWS',
  async (id, { dispatch, extra: api }) => {
    const response = await api.get<IComment[]>(`/comments/${id}`);
    return {
      filmId: id,
      comments: response.data
    } as ICommentsInfo;
  },
);

export const addReviewAction = createAsyncThunk<void, ISendComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'ADD_REVIEW',
  async (data, { dispatch, extra: api }) => {
    api.post(`/comments/${data.filmId}`, {
      comment: data.comment,
      rating: data.rating
    });
  },
);

export const getFavoriteFilmsAction = createAsyncThunk<IFilmInfo[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'GET_FAVORITE_FILMS',
  async (data, { dispatch, extra: api }) => {
    const response = await api.get<IFilmInfo[]>('/favorite');
    return response.data;
  },
);
