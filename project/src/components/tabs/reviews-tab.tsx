import { IComment } from '../../types/IComment';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Spinner } from '../spinner/spinner';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { useEffect } from 'react';
import { fetchReviewsAction } from '../../store/api-actions';

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
  const { currentFilm, reviewsFilmId, reviews, isDataLoaded } = useAppSelector((state) => state);

  useEffect(() => {
    if (currentFilm !== undefined && (reviewsFilmId === undefined || currentFilm.id !== reviewsFilmId)) {
      dispatch(fetchReviewsAction(currentFilm.id));
    }
  });

  const dispatch = useAppDispatch();

  if (!isDataLoaded) {
    return <Spinner />;
  }

  if (currentFilm === undefined) {
    return <NotFoundError />;
  }

  const reviewsCopy = [...reviews];
  const middle = Math.round(reviewsCopy.length / 2);
  const firstColumn = reviewsCopy.splice(0, middle);
  const secondColumn = reviewsCopy.splice(middle);
  return (
    <div className='film-card__reviews film-card__row'>
      <ReviewsColumn comments={firstColumn} />
      <ReviewsColumn comments={secondColumn} />
    </div>
  );
}
