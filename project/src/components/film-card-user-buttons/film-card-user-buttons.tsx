import { Link } from 'react-router-dom';
import { IFilm } from '../../types/IFilmInfo';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeFilmFavoriteStatus } from '../../store/api-actions';
import { getFavoritesCount } from '../../store/favorite-data/selectors';
import { incrementFavoritesAction, decrementFavoritesAction } from '../../store/favorite-data/favorite-data';

export function FilmCardUserButtons({ film }: IFilm) {
  const [favoritesCount, setFavoritesCount] = useState(useAppSelector(getFavoritesCount));
  const [isFavorite, setIsFavorite] = useState(film.isFavorite);

  const dispatch = useAppDispatch();
  const addToFavorites = () => {
    dispatch(changeFilmFavoriteStatus({ filmId: film.id, status: isFavorite ? 0 : 1 }));
    isFavorite ? dispatch(decrementFavoritesAction()) : dispatch(incrementFavoritesAction());
    setFavoritesCount(isFavorite ? favoritesCount - 1 : favoritesCount + 1);
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <button className='btn btn--list film-card__button' type='button' onClick={addToFavorites}>
        <svg viewBox='0 0 19 20' width='19' height='20'>
          <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
        </svg>
        <span>My list</span>
        <span className='film-card__count'>{favoritesCount}</span>
      </button>

      <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>
    </>
  );
}
