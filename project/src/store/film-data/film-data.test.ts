import { filmData, IFilmData } from "./film-data";
import { fetchFilmAction, fetchSimilarAction } from "../api-actions";
import { makeFakeFilm, makeFakeFilms } from "../../utils/mocks";

const mockOneFilm = makeFakeFilm();
const mockSeveralFilms = makeFakeFilms();

describe('Reducer: filmData', () => {
  let state: IFilmData;

  beforeEach(() => {
    state = {
      currentFilm: undefined,
      filmLoading: false,
      similarFilms: [],
      similarLoading: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        currentFilm: undefined,
        filmLoading: false,
        similarFilms: [],
        similarLoading: false,
      });
  });

  describe('fetchFilmAction test', () => {
    it('should load film on fulfilled', () => {
      expect(filmData.reducer(state, { type: fetchFilmAction.fulfilled.type, payload: mockOneFilm }).currentFilm)
        .toEqual(mockOneFilm);
    });
  });

  describe('fetchSimilarAction test', () => {
    it('should load similar films on fulfilled', () => {
      expect(filmData.reducer(state, { type: fetchSimilarAction.fulfilled.type, payload: mockSeveralFilms }).similarFilms)
        .toEqual(mockSeveralFilms);
    });
  });
});
