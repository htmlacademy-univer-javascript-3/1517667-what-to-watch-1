import { useAppSelector } from '../../hooks';
import { Spinner } from '../spinner/spinner';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';

export function OverviewTab() {
  const { currentFilm, isDataLoaded } = useAppSelector((state) => state);

  if (!isDataLoaded) {
    return <Spinner />;
  }

  if (currentFilm === undefined) {
    return <NotFoundError />;
  }

  return (
    <div>
      <div className='film-rating'>
        <div className='film-rating__score'>{currentFilm.rating}</div>
        <p className='film-rating__meta'>
          <span className='film-rating__level'>{currentFilm.rating}</span>
          <span className='film-rating__count'>{currentFilm.scoresCount}</span>
        </p>
      </div>

      <div className='film-card__text'>
        <p>{currentFilm.description}</p>

        <p className='film-card__director'><strong>Director: {currentFilm.director}</strong></p>

        <p className='film-card__starring'><strong>Starring: {currentFilm.starring.join(', ')} and other</strong></p>
      </div>
    </div>
  );
}
