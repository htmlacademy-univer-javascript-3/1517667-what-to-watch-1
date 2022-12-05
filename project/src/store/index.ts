import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer/root-reducer';
import { getApi } from '../api';
import { redirect } from './redirect';

const api = getApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect)
});
