import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../history-router/history-router';
import { FilmCardDescription } from './film-card-description';
import { AuthorizationStatus } from '../private-route/private-route';
import { makeFakeFilm } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push('/films/1');

const store = mockStore({
  AUTH_INFO: { authorizationStatus: AuthorizationStatus.NoAuth }
});

const mockFilm = makeFakeFilm();

describe('Component: FilmCardDescription', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmCardDescription film={mockFilm} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released.toString())).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
  });

  it('should redirect when user click "Play"', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={'/player/1'}
              element={<h1>Player rendered</h1>}
            />
            <Route
              path='*'
              element={<FilmCardDescription film={mockFilm} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/Player rendered/i)).toBeInTheDocument();
  });
});
