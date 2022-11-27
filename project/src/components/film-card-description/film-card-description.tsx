import { Link } from 'react-router-dom';
import { IFilm } from '../../types/IFilmInfo';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../private-route/private-route';

interface IFilmId {
  id: number;
}

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

function FilmCardButtons({ id }: IFilmId) {
  const { authorizationStatus } = useAppSelector((state) => state);

  return (
    <div className='film-card__buttons'>

      <button className='btn btn--play film-card__button' type='button'>
        <Link to={`/player/${id}`}>
          <svg viewBox='0 0 19 19' width='19' height='19'>
            <use xlinkHref='#play-s'></use>
          </svg>
        </Link>
        <span>Play</span>
      </button>

      <button className='btn btn--list film-card__button' type='button'>
        <svg viewBox='0 0 19 20' width='19' height='20'>
          <use xlinkHref='#add'></use>
        </svg>
        <span>My list</span>
        <span className='film-card__count'>9</span>
      </button>

      {
        authorizationStatus === AuthorizationStatus.Auth && (
          <Link to={`/addreview/${id}`} className="btn film-card__button">Add review</Link>
        )
      }
    </div>
  );
}

export function FilmCardDescription({film} : IFilm) {
  return (
    <div className='film-card__desc'>
      <h2 className='film-card__title'>{film.name}</h2>
      <p className='film-card__meta'>
        <span className='film-card__genre'>{film.genre}</span>
        <span className='film-card__year'>{film.released}</span>
      </p>

      <FilmCardButtons id={film.id} />
    </div>
  );
}
