import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../types/Namespace';
import { IFilmInfo } from '../../types/IFilmInfo';
import { getFavoriteFilmsAction } from '../api-actions';

interface IFavoriteData {
  favoriteFilms: IFilmInfo[];
  favoriteLoading: boolean;
}

const initialState = {
  favoriteFilms: [],
  favoriteLoading: false,
} as IFavoriteData;

export const favoriteData = createSlice({
  name: Namespace.FilmData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFavoriteFilmsAction.pending, (state) => {
        state.favoriteLoading = true;
      })
      .addCase(getFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteLoading = false;
      })
      .addCase(getFavoriteFilmsAction.rejected, (state) => {
        state.favoriteLoading = false;
      });
  }
});
