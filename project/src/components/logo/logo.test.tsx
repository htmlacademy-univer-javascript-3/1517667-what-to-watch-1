import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router/history-router';
import { Logo } from './logo';

const history = createMemoryHistory();
history.push('/logo');

describe('Component: FilmCardDescription', () => {
  it('should redirect when user click "Play"', async () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={'/'}
            element={<h1>Main page rendered</h1>}
          />
          <Route
            path='*'
            element={<Logo isLight={false} />}
          />
        </Routes>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/Main page rendered/i)).toBeInTheDocument();
  });
});
