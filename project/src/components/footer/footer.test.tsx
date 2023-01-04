import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-router/history-router';
import { Footer } from './footer';

describe('Component: Footer', () => {
  const history = createMemoryHistory();
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    const copyright = screen.getByText('© 2019 What to watch Ltd.');

    expect(copyright).toBeInTheDocument();
  });
});
