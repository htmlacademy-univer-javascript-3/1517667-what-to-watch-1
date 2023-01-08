import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../history-router/history-router';
import { AuthorizationStatus } from '../private-route/private-route';
import { UserBlock } from './user-block';
import thunk from 'redux-thunk';

const history = createMemoryHistory();
history.push('/userblock');

describe('Component: FilmCardUserButtons', () => {
  it('should redirect when user click "Log in"', async () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      AUTH_INFO: { authorizationStatus: AuthorizationStatus.NoAuth }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={'/login'}
              element={<h1>Login page rendered</h1>}
            />
            <Route
              path='*'
              element={<UserBlock />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/Login page rendered/i)).toBeInTheDocument();
  });

  it('redirects', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
      AUTH_INFO: { authorizationStatus: AuthorizationStatus.Auth }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={'/mylist'}
              element={<h1>Favorites page rendered</h1>}
            />
            <Route
              path='*'
              element={<UserBlock />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    const favoritesLink = screen.getByTestId('favorites');

    fireEvent.click(favoritesLink);

    expect(screen.getByText(/Favorites page rendered/i)).toBeInTheDocument();
  });
});
