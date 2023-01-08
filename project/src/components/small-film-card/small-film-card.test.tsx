import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router/history-router';
import { SmallFilmCard } from './small-film-card';
import { makeFakeFilm } from '../../utils/mocks';

const history = createMemoryHistory();
history.push('/');

const mockFilm = makeFakeFilm();

describe('Component: SmallFilmCard', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <SmallFilmCard film={mockFilm} />
      </HistoryRouter>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
  });

  it('should redirect when user click on card', async () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={'/films/1'}
            element={<h1>Film page rendered</h1>}
          />
          <Route
            path='*'
            element={<SmallFilmCard film={mockFilm} />}
          />
        </Routes>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/Film page rendered/i)).toBeInTheDocument();
  });
});
