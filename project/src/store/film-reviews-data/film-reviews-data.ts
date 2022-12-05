import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../types/Namespace';
import { IComment } from '../../types/IComment';
import { fetchReviewsAction } from '../api-actions';

interface IReviewsData {
  reviewsFilmId: number;
  reviewsLoading: boolean;
  reviews: IComment[];
}

const initialState = {
  reviewsFilmId: 0,
  reviewsLoading: false,
  reviews: []
} as IReviewsData;

export const reviewsData = createSlice({
  name: Namespace.FilmReviewsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviewsFilmId = action.payload.filmId;
        state.reviews = action.payload.comments;
        state.reviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsLoading = false;
      });
  }
});
