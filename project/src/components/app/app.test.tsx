import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../history-router/history-router';
import { AuthorizationStatus } from '../private-route/private-route';
import { makeFakeFilm } from '../../utils/mocks';
import App from './app';

const mockStore = configureMockStore();
const mockFilm = makeFakeFilm();

const store = mockStore({
  AUTH_INFO: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  GENERAL_DATA: {
    allFilms: [],
    genresList: ['All genres'],
    genreToFilms: {},
    promo: mockFilm,
    currentGenre: 'All genres',
    pageFilms: [],
    page: 1,
    isLastPage: true,
    allFilmsLoading: false,
    promoLoading: false,
  },
  FILM_DATA: {
    currentFilm: mockFilm,
    filmLoading: false,
    similarFilms: [],
    similarLoading: false,
  },
  FILM_REVIEWS_DATA: {
    reviewsFilmId: 1,
    areReviewsOutdated: false,
    areReviewsLoading: false,
    reviews: []
  },
  FAVORITE_DATA: {
    favoriteFilms: [],
    favoritesCount: 0,
    areFavoriteLoading: false,
    areFavoriteOutdated: false,
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render main page when user navigate to "/"', () => {
    history.push('/');

    render(fakeApp);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render login page when user navigate to "/login"', () => {
    history.push('/login');

    render(fakeApp);

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render film page when user navigate to "/films/{id}"', () => {
    history.push('/films/1');

    render(fakeApp);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should render player when user navigate to "/player/{id}"', () => {
    history.push('/player/1');

    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
  });

  it('should render reviews editor when user navigate to "/films/{id}/review"', () => {
    history.push('/films/1/review');

    render(fakeApp);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render favorites list when user navigate to "/mylist"', () => {
    history.push('/mylist');

    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render not found when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Return to main page')).toBeInTheDocument();
  });
});
