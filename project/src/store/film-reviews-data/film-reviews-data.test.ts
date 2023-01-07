import { reviewsData, IReviewsData } from './film-reviews-data';
import { fetchReviewsAction, addReviewAction } from '../api-actions';
import { makeFakeCommentsInfo } from '../../utils/mocks';

const mockCommentsInfo = makeFakeCommentsInfo();

describe('Reducer: reviewsData', () => {
  let state: IReviewsData;

  beforeEach(() => {
    state = {
      reviewsFilmId: 0,
      areReviewsLoading: false,
      reviews: [],
      reviewsOutdated: false,
      isReviewSent: true,
      errorsInSending: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        reviewsFilmId: 0,
        areReviewsLoading: false,
        reviews: []
      });
  });

  describe('fetchReviewsAction test', () => {
    it('should load reviews on fulfilled', () => {
      expect(reviewsData.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: mockCommentsInfo }))
        .toEqual({
          reviewsFilmId: mockCommentsInfo.filmId,
          areReviewsLoading: false,
          reviews: mockCommentsInfo.comments
        });
    });
  });
});
