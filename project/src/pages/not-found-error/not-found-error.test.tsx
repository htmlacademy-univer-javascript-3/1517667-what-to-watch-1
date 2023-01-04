import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-router/history-router';
import { NotFoundError } from './not-found-error';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundError />
      </HistoryRouter>
    );

    const headerElement = screen.getByText('404 Not Found');
    const linkElement = screen.getByText('Return to main page');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
