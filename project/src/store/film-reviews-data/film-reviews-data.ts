import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../types/Namespace';
import { IComment } from '../../types/IComment';
import { fetchReviewsAction, addReviewAction } from '../api-actions';

export interface IReviewsData {
  reviewsFilmId: number;
  areReviewsLoading: boolean;
  reviews: IComment[];
  reviewsOutdated: boolean;
  isReviewSent: boolean;
  errorsInSending: boolean;
}

const initialState = {
  reviewsFilmId: 0,
  areReviewsLoading: false,
  reviews: [],
  reviewsOutdated: true,
  isReviewSent: true,
  errorsInSending: false
} as IReviewsData;

export const reviewsData = createSlice({
  name: Namespace.FilmReviewsData,
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.errorsInSending = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.areReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviewsFilmId = action.payload.filmId;
        state.reviews = action.payload.comments;
        state.areReviewsLoading = false;
        state.reviewsOutdated = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.areReviewsLoading = false;
      })
      .addCase(addReviewAction.pending, (state) => {
        state.isReviewSent = false;
      })
      .addCase(addReviewAction.fulfilled, (state) => {
        state.isReviewSent = true;
        state.errorsInSending = false;
        state.reviewsOutdated = true;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.isReviewSent = true;
        state.errorsInSending = true;
      });
  }
});

export const { resetErrors } = reviewsData.actions;
