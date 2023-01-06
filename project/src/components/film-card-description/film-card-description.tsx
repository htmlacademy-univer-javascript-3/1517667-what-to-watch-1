import { Link } from 'react-router-dom';
import { IFilm } from '../../types/IFilmInfo';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../private-route/private-route';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';
import { FilmCardUserButtons } from '../film-card-user-buttons/film-card-user-buttons';

export function FilmCardDescription({ film }: IFilm) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <div className='film-card__desc'>
      <h2 className='film-card__title'>{film.name}</h2>
      <p className='film-card__meta'>
        <span className='film-card__genre'>{film.genre}</span>
        <span className='film-card__year'>{film.released}</span>
      </p>

      <div className='film-card__buttons'>
        <button className='btn btn--play film-card__button' type='button'>
          <Link to={`/player/${film.id}`}>
            <svg viewBox='0 0 19 19' width='19' height='19'>
              <use xlinkHref='#play-s'></use>
            </svg>
          </Link>
          <span>Play</span>
        </button>
        {authorizationStatus === AuthorizationStatus.Auth && (<FilmCardUserButtons film={film} />)}
      </div>
    </div>
  );
}
