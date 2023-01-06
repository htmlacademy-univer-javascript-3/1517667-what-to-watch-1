import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../history-router/history-router';
import { FilmCardUserButtons } from './film-card-user-buttons';
import { AuthorizationStatus } from '../private-route/private-route';
import { makeFakeFilm } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push('/films/1');

const store = mockStore({
  AUTH_INFO: { authorizationStatus: AuthorizationStatus.Auth },
  FAVORITE_DATA: {
    favoritesCount: 0,
    areFavoriteLoading: false,
    areFavoriteOutdated: false,
  }
});

const mockFilm = makeFakeFilm();

describe('Component: FilmCardUserButtons', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmCardUserButtons film={mockFilm} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should redirect when user click "Add review"', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={'/films/1/review'}
              element={<h1>Review editor rendered</h1>}
            />
            <Route
              path='*'
              element={<FilmCardUserButtons film={mockFilm} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/Review editor rendered/i)).toBeInTheDocument();
  });
});