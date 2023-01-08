import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router/history-router';
import { Tabs } from './tabs';
import { makeFakeFilm } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
history.push('/');

const mockFilm = makeFakeFilm();
const mockStore = configureMockStore();
const store = mockStore({
  FILM_DATA: {
    currentFilm: mockFilm,
    filmLoading: false,
    similarFilms: [],
    similarLoading: false,
  },
  FILM_REVIEWS_DATA: {
    reviewsFilmId: 1,
    areReviewsLoading: false,
    reviews: []
  }
});

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should change tab on click', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText('Details'));

    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });
});
