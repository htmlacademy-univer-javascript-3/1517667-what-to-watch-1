import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../../components/history-router/history-router';
import { AuthorizationStatus } from '../../components/private-route/private-route';
import { MyList } from './my-list';
import { makeFakeFilms } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockFilms = makeFakeFilms();

const store = mockStore({
  AUTH_INFO: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  FAVORITE_DATA: {
    favoriteFilms: mockFilms,
    favoritesCount: mockFilms.length,
    areFavoriteLoading: false,
    areFavoriteOutdated: false,
  }
});

describe('Component: FilmCardUserButtons', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
