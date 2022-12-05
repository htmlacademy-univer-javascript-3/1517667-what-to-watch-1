import { State } from '../../types/state';
import { Namespace } from '../../types/Namespace';
import { IComment } from '../../types/IComment';

export const getReviewsFilmId = (state: State): number => state[Namespace.FilmReviewsData].reviewsFilmId;
export const areReviewsInLoading = (state: State): boolean => state[Namespace.FilmReviewsData].reviewsLoading;
export const getReviews = (state: State): IComment[] => state[Namespace.FilmReviewsData].reviews;
