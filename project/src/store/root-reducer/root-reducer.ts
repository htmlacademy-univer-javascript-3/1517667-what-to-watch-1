import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../../types/Namespace';
import { authProcess } from '../auth-process/auth-process';
import { generalData } from '../general-data/general-data';
import { filmData } from '../film-data/film-data';
import { reviewsData } from '../film-reviews-data/film-reviews-data';
import { favoriteData } from '../favorite-data/favorite-data';

export const rootReducer = combineReducers({
  [Namespace.AuthInfo]: authProcess.reducer,
  [Namespace.GeneralData]: generalData.reducer,
  [Namespace.FilmData]: filmData.reducer,
  [Namespace.FilmReviewsData]: reviewsData.reducer,
  [Namespace.FavoriteData]: favoriteData.reducer,
});
