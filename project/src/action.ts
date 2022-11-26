import { createAction } from '@reduxjs/toolkit';
import { IFilmInfo } from './types/IFilmInfo';

export const changeGenreAction = createAction('CHANGE_GENRE', (value: string) => ({ payload: value }));
export const turnToNextPageAction = createAction('NEXT_PAGE',);
export const setLoadedStatusAction = createAction('LOAD', (value: boolean) => ({ payload: value }));
export const initAllFilmsAction = createAction('SET_ALL_FILMS', (value: IFilmInfo[]) => ({ payload: value }));
export const setPromoFilmAction = createAction('SET_PROMO_FILM', (value: IFilmInfo) => ({ payload: value }));
export const setErrorAction = createAction('SET_ERROR', (value: string | null) => ({ payload: value }));
export const setCurrentFilmAction = createAction('SET_CURRENT_FILM', (value: IFilmInfo) => ({ payload: value }));
