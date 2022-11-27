import { configureStore } from '@reduxjs/toolkit';
import { updateStore, preloadedState } from '../reducer';
import { getApi } from '../api';
import { redirect } from './redirect';

const api = getApi();

export const store = configureStore({
  reducer: updateStore,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect),
  preloadedState
});
