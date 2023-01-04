import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <Spinner />
    );

    const header = screen.getByText('You spin me right round...');
    const text = screen.getByText('Please, wait');

    expect(header).toBeInTheDocument();
    expect(text).toBeInTheDocument(); 
  });
});
