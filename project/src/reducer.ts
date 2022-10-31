import { Action } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { ISmallFilmCardInfo } from './components/small-film-card/small-film-card';
import { allFilms } from './mocks/films-lists';

export interface IState {
  genre: string;
  films: ISmallFilmCardInfo[];
}

export const preloadedState = {
  genre: 'All genres',
  films: allFilms
} as IState;

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

function getFilmsOfGenre(genre: string) {
  if (genre === 'All genres') {
    return allFilms;
  }
  return allFilms.filter((f) => f.genre === genre);
}

export const updateStore = createReducer(preloadedState, (builder) => {
  builder
    .addCase('CHANGE_GENRE', (state: IState, action: ActionWithPayload<string>) => {
      state.genre = action.payload;
      state.films = getFilmsOfGenre(action.payload);
    });
});
