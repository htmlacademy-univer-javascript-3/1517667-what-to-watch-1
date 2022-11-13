import { Action } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { ISmallFilmCardInfo } from './components/small-film-card/small-film-card';
import { allFilms } from './mocks/films-lists';

const PAGE_SIZE = 8;

export interface IState {
  genre: string;
  films: ISmallFilmCardInfo[];
  page: number;
  isLastPage: boolean;
}

export const preloadedState = {
  genre: 'All genres',
  films: allFilms.slice(0, PAGE_SIZE),
  page: 1,
  isLastPage: allFilms.length <= PAGE_SIZE
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
      state.page = 1;
      const genreFilms = getFilmsOfGenre(action.payload);
      state.films = genreFilms.slice(0, PAGE_SIZE);
      state.isLastPage = genreFilms.length <= PAGE_SIZE;
    })
    .addCase('NEXT_PAGE', (state: IState, action: Action) => {
      if (!state.isLastPage) {
        const genreFilms = getFilmsOfGenre(state.genre);
        state.films.push.apply(state.films, genreFilms.slice(state.page * PAGE_SIZE, (state.page + 1) * PAGE_SIZE));
        state.page += 1;
        state.isLastPage = genreFilms.length <= (state.page * PAGE_SIZE);
      }
    });
});
