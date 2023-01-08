import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../../components/history-router/history-router';
import { MainPageCatalogue } from './main-page-catalogue';
import { makeFakeFilm } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockFilm = makeFakeFilm();

const store = mockStore({
  GENERAL_DATA: {
    allFilms: [mockFilm],
    genresList: ['All genres', mockFilm.genre],
    promo: mockFilm,
    currentGenre: 'All genres',
    pageFilms: [[mockFilm]],
    page: 1,
    isLastPage: false,
    allFilmsLoading: false,
    promoLoading: false,
  },
});

describe('Component: FilmCardUserButtons', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPageCatalogue />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });
});
