import { IComment } from '../../types/IComment';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Spinner } from '../spinner/spinner';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { useEffect } from 'react';
import { fetchReviewsAction } from '../../store/api-actions';
import { getCurrentFilm } from '../../store/film-data/selectors';
import { getReviews, getReviewsFilmId, areReviewsInLoading } from '../../store/film-reviews-data/selector';

interface ICommentWrap {
  comment: IComment
}

interface ICommentsWrap {
  comments: IComment[]
}

function SingleReviewBlock({ comment } : ICommentWrap) {
  return (
    <div className='review'>
      <blockquote className='review__quote'>
        <p className='review__text'>{comment.comment}</p>

        <footer className='review__details'>
          <cite className='review__author'>{comment.user.name}</cite>
          <time className='review__date' dateTime={comment.date}>{comment.date}</time>
        </footer>
      </blockquote>

      <div className='review__rating'>{comment.rating}</div>
    </div>
  );
}

function ReviewsColumn({ comments } : ICommentsWrap) {
  return (
    <div className='film-card__reviews-col'>
      {comments.map((c) => (<SingleReviewBlock key={`${c.date}-${c.user.id}-${c.rating}`} comment={c} />))}
    </div>
  );
}

export function ReviewsTab() {
  const currentFilm = useAppSelector(getCurrentFilm);
  const reviewsFilmId = useAppSelector(getReviewsFilmId);
  const areReviewsLoading = useAppSelector(areReviewsInLoading);
  const reviews = useAppSelector(getReviews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentFilm !== undefined && currentFilm.id !== reviewsFilmId) {
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
