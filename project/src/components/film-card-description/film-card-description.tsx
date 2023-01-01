import { Link } from 'react-router-dom';
import { IFilm } from '../../types/IFilmInfo';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AuthorizationStatus } from '../private-route/private-route';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';
import { changeFilmFavoriteStatus } from '../../store/api-actions';
import { getFavoritesCount } from '../../store/favorite-data/selectors';
import { incrementFavoritesAction, decrementFavoritesAction } from '../../store/favorite-data/favorite-data';

export interface IFilmCardDesc {
  id: string;
  name: string;
  genre: string;
  released: number;
}

export interface IFilmCard extends IFilmCardDesc {
  posterSrc: string;
  posterAlt: string;
}

function UserButtons({ film }: IFilm) {
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

function FilmCardButtons({ film }: IFilm) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <div className='film-card__buttons'>
      <button className='btn btn--play film-card__button' type='button'>
        <Link to={`/player/${film.id}`}>
          <svg viewBox='0 0 19 19' width='19' height='19'>
            <use xlinkHref='#play-s'></use>
          </svg>
        </Link>
        <span>Play</span>
      </button>
      { authorizationStatus === AuthorizationStatus.Auth && (<UserButtons film={film}/>) }
    </div>
  );
}

export function FilmCardDescription({ film }: IFilm) {
  return (
    <div className='film-card__desc'>
      <h2 className='film-card__title'>{film.name}</h2>
      <p className='film-card__meta'>
        <span className='film-card__genre'>{film.genre}</span>
        <span className='film-card__year'>{film.released}</span>
      </p>

      <FilmCardButtons film={film} />
    </div>
  );
}
