import { State } from '../../types/state';
import { Namespace } from '../../types/Namespace';
import { IFilmInfo } from '../../types/IFilmInfo';

export const getFavoriteFilms = (state: State): IFilmInfo[] => state[Namespace.FavoriteData].favoriteFilms;
export const areFavoriteFilmsInLoading = (state: State): boolean => state[Namespace.FavoriteData].favoriteLoading;
