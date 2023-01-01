import React from 'react';
import { FormEvent, useState, useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import { addReviewAction } from '../../store/api-actions';
import { ReviewComponent } from './review-component';
import { RatingComponent } from './rating-component';

interface FilmId {
  filmId: number
}

export function ReviewEditor({ filmId }: FilmId) {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(8);
  const [review, setReview] = React.useState('');

  const updateRating = useCallback(
    (ratingValue: number) => setRating(ratingValue),
    []
  );
  const updateReview = useCallback(
    (reviewContent: string) => setReview(reviewContent),
    []
  );

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    //evt.preventDefault();
    dispatch(addReviewAction({ comment: review, filmId: filmId, rating: rating }));
  };

  return (
    <div className='add-review'>
      <form className='add-review__htmlForm' onSubmit={handleSubmit}>
        <RatingComponent
          rating={rating}
          onChange={updateRating}
        />
        <div className='add-review__text'>
          <ReviewComponent
            review={review}
            onChange={updateReview}
          />
          <div className='add-review__submit'>
            <button className='add-review__btn' type='submit'>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}
