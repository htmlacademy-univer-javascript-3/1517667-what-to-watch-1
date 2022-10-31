import { configureStore } from '@reduxjs/toolkit';
import { updateStore, preloadedState } from '../reducer';

export const store = configureStore({ reducer: updateStore, preloadedState });
