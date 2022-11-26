import { configureStore } from '@reduxjs/toolkit';
import { updateStore, preloadedState } from '../reducer';
import { getApi } from '../api';

const api = getApi();

export const store = configureStore({
  reducer: updateStore,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }),
  preloadedState
});
