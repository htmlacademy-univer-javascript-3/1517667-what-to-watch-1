import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../types/Namespace';
import { IFilmInfo } from '../../types/IFilmInfo';
import { getFavoriteFilmsAction, changeFilmFavoriteStatus } from '../api-actions';

export interface IFavoriteData {
  favoriteFilms: IFilmInfo[];
  favoritesCount: number;
  areFavoriteLoading: boolean;
  areFavoriteOutdated: boolean;
}

const initialState = {
  favoriteFilms: [],
  favoritesCount: 0,
  areFavoriteLoading: false,
  areFavoriteOutdated: true,
} as IFavoriteData;

export const favoriteData = createSlice({
  name: Namespace.FilmData,
  initialState,
  reducers: {
    incrementFavoritesAction: (state) => {
      state.favoritesCount += 1;
    },
    decrementFavoritesAction: (state) => {
      state.favoritesCount -= 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFavoriteFilmsAction.pending, (state) => {
        state.areFavoriteLoading = true;
      })
      .addCase(getFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoritesCount = action.payload.length;
        state.areFavoriteLoading = false;
        state.areFavoriteOutdated = false;
      })
      .addCase(getFavoriteFilmsAction.rejected, (state) => {
        state.areFavoriteLoading = false;
      })
      .addCase(changeFilmFavoriteStatus.fulfilled, (state) => {
        state.areFavoriteOutdated = true;
      });
  }
});

export const { incrementFavoritesAction, decrementFavoritesAction } = favoriteData.actions;
