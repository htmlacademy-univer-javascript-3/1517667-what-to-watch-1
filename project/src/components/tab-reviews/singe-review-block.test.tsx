import { render, screen } from '@testing-library/react';
import { SingleReviewBlock } from './single-review-block';
import { makeFakeComment } from '../../utils/mocks';

describe('Component: SingleReviewBlock', () => {
  it('should render correctly', () => {
    const mockComment = makeFakeComment();

    render(
      <SingleReviewBlock comment={mockComment}/>
    );

    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
    expect(screen.getByText(mockComment.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockComment.rating)).toBeInTheDocument();
  });
});
