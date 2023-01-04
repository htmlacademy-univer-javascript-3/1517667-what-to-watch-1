import { generalData, IGeneralData } from './general-data';
import { makeFakeFilms, makeFakeFilm } from '../../utils/mocks';
import { setInitFilmsInfo, setPromoFilmInfo } from '../api-actions';
import { changeGenreAction } from './general-data';

const mockFilms = makeFakeFilms();
const mockFilm = makeFakeFilm();

describe('Reducer: generalData', () => {
  let state: IGeneralData;

  beforeEach(() => {
    state = {
      allFilms: [],
      genresList: ['All genres'],
      genreToFilms: {},
      promo: undefined,
      currentGenre: 'All genres',
      pageFilms: [],
      page: 1,
      isLastPage: false,
      allFilmsLoading: false,
      promoLoading: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(generalData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('setInitFilmsInfo test', () => {
    it('load all films on setInitFilmsInfo', () => {
      expect(generalData.reducer(state, { type: setInitFilmsInfo.fulfilled.type, payload: mockFilms }).allFilms)
        .toEqual(mockFilms);
    });
  });

  describe('setPromoFilmInfo test', () => {
    it('load promo film on setPromoFilmInfo', () => {
      expect(generalData.reducer(state, { type: setPromoFilmInfo.fulfilled.type, payload: mockFilm }).promo)
        .toEqual(mockFilm);
    });
  });

  describe('changeGenreAction', () => {
    it('change genre', () => {
      state.genresList = ['All genres', 'Drama'];
      state.genreToFilms = {
        'All genres': mockFilms,
        'Drama': [mockFilms[0]]
      };
      expect(generalData.reducer(state, changeGenreAction('Drama')))
        .toEqual({
          allFilms: [],
          genresList: ['All genres', 'Drama'],
          genreToFilms: {
            'All genres': mockFilms,
            'Drama': [mockFilms[0]]
          },
          promo: undefined,
          currentGenre: 'Drama',
          pageFilms: [mockFilms[0]],
          page: 1,
          isLastPage: true,
          allFilmsLoading: false,
          promoLoading: false,
        });
    });
  });
});
