import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../types/Namespace';
import { IFilmInfo } from '../../types/IFilmInfo';
import { fetchFilmAction, fetchSimilarAction } from '../api-actions';

export interface IFilmData {
  currentFilm: IFilmInfo | undefined;
  filmLoading: boolean;
  similarFilms: IFilmInfo[];
  similarLoading: boolean;
}

const initialState = {
  currentFilm: undefined,
  filmLoading: false,
  similarFilms: [],
  similarLoading: false,
} as IFilmData;

export const filmData = createSlice({
  name:  Namespace.FilmData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state) => {
        state.filmLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.currentFilm = action.payload;
        state.filmLoading = false;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.filmLoading = false;
      })
      .addCase(fetchSimilarAction.pending, (state) => {
        state.similarLoading = true;
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.similarLoading = false;
      });
  }
});
