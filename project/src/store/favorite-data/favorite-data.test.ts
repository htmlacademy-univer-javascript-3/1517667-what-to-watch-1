import { favoriteData } from './favorite-data';
import { IFavoriteData } from './favorite-data';
import { getFavoriteFilmsAction, changeFilmFavoriteStatus } from '../api-actions';
import { incrementFavoritesAction, decrementFavoritesAction } from './favorite-data';
import { makeFakeFilms } from '../../utils/mocks';

const mockFavoriteFilms = makeFakeFilms();

describe('Reducer: favoriteData', () => {
  let state: IFavoriteData;

  beforeEach(() => {
    state = {
      favoriteFilms: [],
      favoritesCount: 0,
      areFavoriteLoading: false,
      areFavoriteOutdated: true,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(favoriteData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        favoriteFilms: [],
        favoritesCount: 0,
        areFavoriteLoading: false,
        areFavoriteOutdated: true,
      });
  });

  describe('getFavoriteFilmsAction test', () => {
    it('should update areFavoriteLoading to true if changeFilmFavoriteStatus pending', () => {
      expect(favoriteData.reducer(state, { type: getFavoriteFilmsAction.pending.type }).areFavoriteLoading)
        .toEqual(true);
    });

    it('should load favorite films and update boolean fields', () => {
      state.areFavoriteLoading = true;
      expect(favoriteData.reducer(state, {type: getFavoriteFilmsAction.fulfilled.type, payload: mockFavoriteFilms}))
        .toEqual({
          favoriteFilms: mockFavoriteFilms,
          favoritesCount: mockFavoriteFilms.length,
          areFavoriteLoading: false,
          areFavoriteOutdated: false
        });
    });

    it('should update authorizationStatus to false if changeFilmFavoriteStatus rejected', () => {
      state.areFavoriteLoading = true;
      expect(favoriteData.reducer(state, {type: getFavoriteFilmsAction.rejected.type }).areFavoriteLoading)
        .toEqual(false);
    });
  });

  describe('changeFilmFavoriteStatus test', () => {
    it('should update areFavoriteOutdated to true if changeFilmFavoriteStatus fulfilled', () => {
      state.areFavoriteOutdated = false;
      expect(favoriteData.reducer(state, {type: changeFilmFavoriteStatus.fulfilled.type }).areFavoriteOutdated)
        .toEqual(true);
    });
  });

  describe('change favorites count test', () => {
    it('should increment on increment', () => {
      expect(favoriteData.reducer(state, incrementFavoritesAction()).favoritesCount)
        .toEqual(1);
    });

    it('should decrement on decrement', () => {
      state.favoritesCount = 1;
      expect(favoriteData.reducer(state, decrementFavoritesAction()).favoritesCount)
        .toEqual(0);
    });
  });
});
