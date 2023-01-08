import { useAppSelector } from '../../hooks';
import { Spinner } from '../spinner/spinner';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { getCurrentFilm, isFilmInLoading } from '../../store/film-data/selectors';

export function TabDetails() {
  const currentFilm = useAppSelector(getCurrentFilm);
  const isFilmLoading = useAppSelector(isFilmInLoading);

  if (isFilmLoading) {
    return <Spinner />;
  }

  if (currentFilm === undefined) {
    return <NotFoundError />;
  }

  const getTimeString = (minutes: number) => {
    if (minutes >= 60) {
      return `${Math.trunc(minutes / 60)}h ${minutes % 60}m`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <div className='film-card__text film-card__row'>
      <div className='film-card__text-col'>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Director</strong>
          <span className='film-card__details-value'>{currentFilm.director}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Starring</strong>
          <span className='film-card__details-value'>
            {currentFilm.starring.join(',\n')}
          </span>
        </p>
      </div>

      <div className='film-card__text-col'>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Run Time</strong>
          <span className='film-card__details-value'>{getTimeString(currentFilm.runTime)}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Genre</strong>
          <span className='film-card__details-value'>{currentFilm.genre}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Released</strong>
          <span className='film-card__details-value'>{currentFilm.released}</span>
        </p>
      </div>
    </div>
  );
}
