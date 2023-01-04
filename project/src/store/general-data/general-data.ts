import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../types/Namespace';
import { IFilmInfo } from '../../types/IFilmInfo';
import { setInitFilmsInfo, setPromoFilmInfo } from '../api-actions';

const PAGE_SIZE = 8;

export interface IGeneralData {
  allFilms: IFilmInfo[];
  genresList: string[];
  genreToFilms: { [id: string]: IFilmInfo[] };
  promo: IFilmInfo | undefined;
  currentGenre: string;
  pageFilms: IFilmInfo[];
  page: number;
  isLastPage: boolean;
  allFilmsLoading: boolean;
  promoLoading: boolean;
}

const initialState = {
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
} as IGeneralData;

function getFilmsOfGenre(allFilms: IFilmInfo[], genre: string) {
  if (genre === 'All genres') {
    return allFilms;
  }
  return allFilms.filter((f) => f.genre === genre);
}

function getGenres(films: IFilmInfo[]) {
  const genres = ['All genres'];
  const propsGenresOnly = films.map((f) => f.genre);
  genres.push(...new Set(propsGenresOnly));
  return genres;
}

export const generalData = createSlice({
  name: Namespace.GeneralData,
  initialState,
  reducers: {
    changeGenreAction: (state, action) => {
      state.currentGenre = action.payload;
      state.page = 1;
      const genreFilms = state.genreToFilms[action.payload];
      state.pageFilms = genreFilms.slice(0, PAGE_SIZE);
      state.isLastPage = genreFilms.length <= PAGE_SIZE;
    },
    turnToNextPageAction: (state) => {
      if (!state.isLastPage) {
        const genreFilms = state.genreToFilms[state.currentGenre];
        state.pageFilms = [...state.pageFilms, ...genreFilms.slice(state.page * PAGE_SIZE, (state.page + 1) * PAGE_SIZE)];
        state.page += 1;
        state.isLastPage = genreFilms.length <= (state.page * PAGE_SIZE);
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(setInitFilmsInfo.pending, (state) => {
        state.allFilmsLoading = true;
      })
      .addCase(setInitFilmsInfo.fulfilled, (state, action) => {
        state.allFilms = action.payload;
        state.genresList = getGenres(action.payload);
        state.genreToFilms = { 'All genres': action.payload };
        for (const genre of state.genresList) {
          state.genreToFilms[genre] = getFilmsOfGenre(action.payload, genre);
        }
        state.pageFilms = action.payload.slice(0, PAGE_SIZE);
        state.isLastPage = action.payload.length <= PAGE_SIZE;
        state.allFilmsLoading = false;
      })
      .addCase(setInitFilmsInfo.rejected, (state, action) => {
        state.allFilmsLoading = false;
      })
      .addCase(setPromoFilmInfo.pending, (state) => {
        state.promoLoading = true;
      })
      .addCase(setPromoFilmInfo.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.promoLoading = false;
      })
      .addCase(setPromoFilmInfo.rejected, (state, action) => {
        state.promoLoading = false;
      });
  }
});

export const { changeGenreAction, turnToNextPageAction } = generalData.actions;
