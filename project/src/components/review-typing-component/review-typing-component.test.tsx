import { render, screen } from '@testing-library/react';
import { ReviewTypingComponent } from './review-typing-component';
import userEvent from '@testing-library/user-event';

describe('Component: ReviewTypingComponent', () => {
  it('should render correctly', () => {
    render(
      <ReviewTypingComponent review='' disabled={false} onChange={jest.fn()} />
    );

    expect(screen.getByPlaceholderText('Review text')).toBeInTheDocument();
  });

  it('onChange should called when text changed', async () => {
    const onChange = jest.fn();

    render(
      <ReviewTypingComponent review='' disabled={false} onChange={onChange} />
    );

    await userEvent.type(screen.getByTestId('textarea'), 'smt');

    expect(onChange).toBeCalledTimes(3);
    expect(onChange).nthCalledWith(1, 's');
    expect(onChange).nthCalledWith(2, 'm');
    expect(onChange).nthCalledWith(3, 't');
  });
});
