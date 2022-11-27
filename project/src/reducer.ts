import { Action } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenreAction,
  turnToNextPageAction,
  setLoadedStatusAction,
  initAllFilmsAction,
  setPromoFilmAction,
  setErrorAction,
  requireAuthorization
} from './action';
import { AuthorizationStatus } from './components/private-route/private-route';
import { IFilmInfo } from './types/IFilmInfo';

const PAGE_SIZE = 8;

export interface IState {
  allFilms: IFilmInfo[];
  genresList: string[];
  genreToFilms: { [id: string]: IFilmInfo[] };
  promo: IFilmInfo | null;
  currentGenre: string;
  pageFilms: IFilmInfo[];
  page: number;
  isLastPage: boolean;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  error: string | null;
}

export const preloadedState = {
  allFilms: [] as IFilmInfo[],
  genresList: ['All genres'],
  genreToFilms: {},
  promo: null,
  currentGenre: 'All genres',
  pageFilms: [] as IFilmInfo[],
  page: 1,
  isLastPage: false,
  authorizationStatus: AuthorizationStatus.NoAuth,
  isDataLoaded: false,
  error: null
} as IState;

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

function getFilmsOfGenre(allFilms: IFilmInfo[], genre: string) {
  if (genre === 'All genres') {
    return allFilms;
  }
  return allFilms.filter((f) => f.genre === genre);
}

function getGenres(films: IFilmInfo[]) {
  const genres = ['All genres'];
  const propsGenresOnly = films.map((f) => f.genre);
  genres.push(...new Set(propsGenresOnly));
  return genres;
}

export const updateStore = createReducer(preloadedState, (builder) => {
  builder
    .addCase(changeGenreAction, (state, action) => {
      state.currentGenre = action.payload;
      state.page = 1;
      const genreFilms = state.genreToFilms[action.payload];
      state.pageFilms = genreFilms.slice(0, PAGE_SIZE);
      state.isLastPage = genreFilms.length <= PAGE_SIZE;
    })
    .addCase(turnToNextPageAction, (state) => {
      if (!state.isLastPage) {
        const genreFilms = state.genreToFilms[state.currentGenre];
        state.pageFilms = [...state.pageFilms, ...genreFilms.slice(state.page * PAGE_SIZE, (state.page + 1) * PAGE_SIZE)];
        state.page += 1;
        state.isLastPage = genreFilms.length <= (state.page * PAGE_SIZE);
      }
    })
    .addCase(setLoadedStatusAction, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(initAllFilmsAction, (state, action) => {
      state.allFilms = action.payload;
      state.genresList = getGenres(action.payload);
      state.genreToFilms = { 'All genres': action.payload };
      state.genresList.map((g) => { state.genreToFilms[g] = getFilmsOfGenre(action.payload, g); });
      state.pageFilms = action.payload.slice(0, PAGE_SIZE);
      state.isLastPage = action.payload.length <= PAGE_SIZE;
    })
    .addCase(setPromoFilmAction, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(setErrorAction, (state, action) => {
      state.error = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
