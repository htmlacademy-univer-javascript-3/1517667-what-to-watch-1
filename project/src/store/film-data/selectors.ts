import { State } from '../../types/state';
import { Namespace } from '../../types/Namespace';
import { IFilmInfo } from '../../types/IFilmInfo';

export const getCurrentFilm = (state: State): IFilmInfo | undefined => state[Namespace.FilmData].currentFilm;
export const isFilmInLoading = (state: State): boolean => state[Namespace.FilmData].filmLoading;
export const getSimilarFilms = (state: State): IFilmInfo[] => state[Namespace.FilmData].similarFilms;
export const areSimilarInLoading = (state: State): boolean => state[Namespace.FilmData].similarLoading;
