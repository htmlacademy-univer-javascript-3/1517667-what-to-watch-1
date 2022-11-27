import React, { useEffect } from 'react';
import { Logo } from '../../components/logo/logo';
import { UserBlock } from '../../components/user-block/user-block';
import { useParams } from 'react-router-dom';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormEvent, useState } from 'react';
import { Spinner } from '../../components/spinner/spinner';
import { addReviewAction, fetchFilmAction } from '../../store/api-actions';
import { IFilm } from '../../types/IFilmInfo';
import { AuthorizationStatus } from '../../components/private-route/private-route';

interface FilmId {
  filmId: number
}

function PageHeader({ film }: IFilm) {
  const { authorizationStatus } = useAppSelector((state) => state);

  return (
    <header className='page-header'>
      <Logo isLight={false} />
      <nav className='breadcrumbs'>
        <ul className='breadcrumbs__list'>
          <li className='breadcrumbs__item'>
            <Link to={`/film/${film.id}`} className='breadcrumbs__link'>{film.name}</Link>
          </li>
          {authorizationStatus === AuthorizationStatus.Auth && (
            <li className='breadcrumbs__item'>
              <Link to={`/addreview/${film.id}`} className='breadcrumbs__link'>Add review</Link>
            </li>
          )}
        </ul>
      </nav>

      <UserBlock />
    </header>
  );
}

function FilmCardHeader({ film }: IFilm) {
  return (
    <div className='film-card__header'>
      <div className='film-card__bg'>
        <img src={film.backgroundImage} alt={film.name} />
      </div>
      <h1 className='visually-hidden'>WTW</h1>
      <PageHeader film={film} />
      <div className='film-card__poster film-card__poster--small'>
        <img src={film.posterImage} alt={film.name} width='218' height='327' />
      </div>
    </div>
  );
}

function ReviewDiv({ filmId }: FilmId) {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(8);
  const [review, setReview] = React.useState('');

  const handleReviewChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addReviewAction({ comment: review, filmId: filmId, rating: rating }));
  };

  return (
    <div className='add-review'>
      <form className='add-review__htmlForm' onSubmit={handleSubmit}>
        <div className='rating'>
          <div className='rating__stars'>
            {[...Array(10).keys()].map((x) => (
              <>
                <input
                  className='rating__input'
                  id={`star-${10 - x}`}
                  type='radio'
                  name='rating'
                  value={10 - x}
                  checked={rating === 10 - x}
                  onChange={() => setRating(10 - x)}
                />
                <label className='rating__label' htmlFor={`star-${10 - x}`}>Rating {10 - x}</label>
              </>))}
          </div>
        </div>
        <div className='add-review__text'>
          <textarea
            className='add-review__textarea'
            name='review'
            id='review'
            value={review}
            placeholder='Review text'
            onChange={handleReviewChange}
          >
          </textarea>
          <div className='add-review__submit'>
            <button className='add-review__btn' type='submit'>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export const ReviewSection = () => {
  const { id } = useParams();
  const { currentFilm, isDataLoaded, error } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id !== currentFilm?.id.toString() && id !== undefined) {
      dispatch(fetchFilmAction(id));
    }
  });

  if (id === undefined || currentFilm === undefined || error) {
    return <NotFoundError />;
  }

  if (!isDataLoaded) {
    return <Spinner />;
  }

  return (
    <section className='film-card film-card--full'>
      <FilmCardHeader film={currentFilm} />
      <div>
        <label htmlFor="review">My Textarea</label>
        <ReviewDiv filmId={currentFilm.id} />
      </div>
    </section>
  );
};
