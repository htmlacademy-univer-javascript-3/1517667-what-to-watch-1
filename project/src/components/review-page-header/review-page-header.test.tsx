import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../history-router/history-router';
import { ReviewPageHeader } from './review-page-header';
import { AuthorizationStatus } from '../private-route/private-route';
import { makeFakeFilm } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push('/films/1/review');

const store = mockStore({
  AUTH_INFO: { authorizationStatus: AuthorizationStatus.Auth }
});

const mockFilm = makeFakeFilm();

describe('Component: ReviewPageHeader', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewPageHeader film={mockFilm} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should redirect when user click film', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={'/films/1'}
              element={<h1>Film page rendered</h1>}
            />
            <Route
              path='*'
              element={<ReviewPageHeader film={mockFilm} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText(mockFilm.name));

    expect(screen.getByText(/Film page rendered/i)).toBeInTheDocument();
  });
});
