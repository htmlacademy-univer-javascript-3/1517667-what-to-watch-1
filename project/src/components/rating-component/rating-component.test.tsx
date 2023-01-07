import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RatingComponent } from './rating-component';

describe('Component: RatingComponent', () => {
  it('should render correctly', async () => {
    render(
      <RatingComponent rating={3} disabled={false} onChange={(ratingValue) => {}}/>
    );

    expect(screen.getByText(/Rating 3/i)).toBeInTheDocument();
  });

  it('on star click cahnge value', async () => {
    const valueChange = jest.fn()

    render(
      <RatingComponent rating={3} disabled={false} onChange={valueChange}/>
    );

    await userEvent.click(screen.getByTestId('4'));
    
    expect(valueChange).toBeCalledTimes(1);
    expect(valueChange).toBeCalledWith(4);
  });
});
