import { State } from '../../types/state';
import { Namespace } from '../../types/Namespace';
import { IFilmInfo } from '../../types/IFilmInfo';

export const fetchingInProgress = (state: State): boolean => state[Namespace.GeneralData].allFilmsLoading;
export const getPromoFilm = (state: State): IFilmInfo | undefined => state[Namespace.GeneralData].promo;
export const getCurrentGenre = (state: State): string => state[Namespace.GeneralData].currentGenre;
export const isPromoLoading = (state: State): boolean => state[Namespace.GeneralData].promoLoading;
export const getPageFilms = (state: State): IFilmInfo[] => state[Namespace.GeneralData].pageFilms;
export const isPageLast = (state: State): boolean => state[Namespace.GeneralData].isLastPage;
export const getGenres = (state: State): string[] => state[Namespace.GeneralData].genresList;
