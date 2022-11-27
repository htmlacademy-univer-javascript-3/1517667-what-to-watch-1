import { createAction } from '@reduxjs/toolkit';
import { IFilmInfo } from './types/IFilmInfo';
import { AuthorizationStatus } from './components/private-route/private-route';

export const changeGenreAction = createAction<string>('CHANGE_GENRE');
export const turnToNextPageAction = createAction('NEXT_PAGE',);
export const setLoadedStatusAction = createAction<boolean>('LOAD');
export const initAllFilmsAction = createAction<IFilmInfo[]>('SET_ALL_FILMS');
export const setPromoFilmAction = createAction<IFilmInfo>('SET_PROMO_FILM');
export const setErrorAction = createAction<string | null>('SET_ERROR');
export const setCurrentFilmAction = createAction<IFilmInfo>('SET_CURRENT_FILM');
export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTHORIZATION');
export const redirectToRoute = createAction<string>('REDIRECT_TO_ROUTE');
