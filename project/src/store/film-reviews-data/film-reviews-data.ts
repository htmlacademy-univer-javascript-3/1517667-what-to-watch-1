import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../types/Namespace';
import { IComment } from '../../types/IComment';
import { fetchReviewsAction, addReviewAction } from '../api-actions';

interface IReviewsData {
  reviewsFilmId: number;
  areReviewsOutdated: boolean;
  areReviewsLoading: boolean;
  reviews: IComment[];
}

const initialState = {
  reviewsFilmId: 0,
  areReviewsOutdated: true,
  areReviewsLoading: false,
  reviews: []
} as IReviewsData;

export const reviewsData = createSlice({
  name: Namespace.FilmReviewsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.areReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviewsFilmId = action.payload.filmId;
        state.reviews = action.payload.comments;
        state.areReviewsLoading = false;
        state.areReviewsOutdated = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.areReviewsLoading = false;
      })
      .addCase(addReviewAction.fulfilled, (state) => {
        state.areReviewsOutdated = true;
      });
  }
});
