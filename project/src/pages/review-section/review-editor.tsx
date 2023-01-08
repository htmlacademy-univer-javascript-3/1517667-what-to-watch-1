
import { FormEvent, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addReviewAction } from '../../store/api-actions';
import { ReviewTypingComponent } from '../../components/review-typing-component/review-typing-component';
import { RatingComponent } from '../../components/rating-component/rating-component';
import { redirectToRoute } from '../../store/action';
import { isReviewSent, sendingError } from '../../store/film-reviews-data/selector';

interface FilmId {
  filmId: number
}

export function ReviewEditor({ filmId }: FilmId) {
  const dispatch = useAppDispatch();
  const isSent = useAppSelector(isReviewSent);
  const errors = useAppSelector(sendingError);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [warningMessage, setWarningMessage] = useState(false);

  const checkInputs = (reviewLen: number, ratingVal: number) => {
    setDisabled(reviewLen < 50 || reviewLen > 400 || ratingVal === 0);
  };

  const updateRating = useCallback(
    (ratingValue: number) => {
      setRating(ratingValue);
      checkInputs(review.length, ratingValue);
    },
    [rating, review]
  );
  const updateReview = useCallback(
    (reviewContent: string) => {
      setReview(reviewContent);
      checkInputs(reviewContent.length, rating);
    },
    [rating, review]
  );

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    dispatch(addReviewAction({ comment: review, filmId: filmId, rating: rating }));
    if (isSent) {
      if (errors) {
        setWarningMessage(true);
      } else {
        dispatch(redirectToRoute(`/films/${filmId}`));
      }
    }
  };

  return (
    <div className='add-review'>
      <form className='add-review__htmlForm' onSubmit={handleSubmit}>
        {warningMessage && <><h3>Problems with sending review to server.</h3><p>Please try again later.</p></>}
        <RatingComponent
          rating={rating}
          disabled={!isSent}
          onChange={updateRating}
        />
        <div className='add-review__text'>
          <ReviewTypingComponent
            review={review}
            disabled={!isSent}
            onChange={updateReview}
          />
          <div className='add-review__submit'>
            <button className='add-review__btn' disabled={disabled} type='submit'>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}
