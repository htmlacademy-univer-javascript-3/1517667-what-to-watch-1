import { render, screen } from '@testing-library/react';
import { makeFakeFilms } from '../../utils/mocks';
import { SimilarFilms } from './similar-films';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../history-router/history-router';
import { Provider } from 'react-redux';

const mockFilms = makeFakeFilms();
const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  FILM_DATA: {
    similarFilms: mockFilms,
    similarLoading: false,
  }
});

describe('Component: FilmCardWrap', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarFilms />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });
});
