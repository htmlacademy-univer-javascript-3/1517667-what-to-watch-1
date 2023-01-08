import { IComment } from '../../types/IComment';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Spinner } from '../spinner/spinner';
import { SingleReviewBlock } from './single-review-block';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { useEffect } from 'react';
import { fetchReviewsAction } from '../../store/api-actions';
import { getCurrentFilm } from '../../store/film-data/selectors';
import { getReviews, getReviewsFilmId, areReviewsInLoading, areReviewsOutdated } from '../../store/film-reviews-data/selector';

interface ICommentsWrap {
  comments: IComment[]
}

function ReviewsColumn({ comments } : ICommentsWrap) {
  return (
    <div className='film-card__reviews-col'>
      {comments.map((c) => (<SingleReviewBlock key={`${c.date}-${c.user.id}-${c.rating}`} comment={c} />))}
    </div>
  );
}

export function TabReviews() {
  const currentFilm = useAppSelector(getCurrentFilm);
  const reviewsFilmId = useAppSelector(getReviewsFilmId);
  const reviewsOutdated = useAppSelector(areReviewsOutdated);
  const areReviewsLoading = useAppSelector(areReviewsInLoading);
  const reviews = useAppSelector(getReviews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentFilm !== undefined && (reviewsOutdated || currentFilm.id !== reviewsFilmId)) {
      dispatch(fetchReviewsAction(currentFilm.id));
    }
  });

  if (areReviewsLoading) {
    return <Spinner />;
  }

  if (currentFilm === undefined) {
    return <NotFoundError />;
  }

  const middle = Math.round(reviews.length / 2);
  const firstColumn = reviews.slice(0, middle);
  const secondColumn = reviews.slice(middle);
  return (
    <div className='film-card__reviews film-card__row'>
      <ReviewsColumn comments={firstColumn} />
      <ReviewsColumn comments={secondColumn} />
    </div>
  );
}
