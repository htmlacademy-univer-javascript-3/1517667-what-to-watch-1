import { useAppSelector } from '../../hooks';
import { Spinner } from '../spinner/spinner';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { getCurrentFilm, isFilmInLoading } from '../../store/film-data/selectors';

export function OverviewTab() {
  const currentFilm = useAppSelector(getCurrentFilm);
  const currentFilmLoading = useAppSelector(isFilmInLoading);

  if (currentFilmLoading) {
    return <Spinner />;
  }

  if (currentFilm === undefined) {
    return <NotFoundError />;
  }

  const getScoreLevel = (score: number) => {
    if (score === 10) {
      return 'Awesome';
    } else if (score > 8 && score < 10) {
      return 'Very good';
    } else if (score > 5 && score <= 8) {
      return 'Good';
    } else if (score > 3 && score <= 5) {
      return 'Normal';
    } else if (score >= 0 && score <= 3) {
      return 'Bad';
    }
  };

  return (
    <div>
      <div className='film-rating'>
        <div className='film-rating__score'>{currentFilm.rating}</div>
        <p className='film-rating__meta'>
          <span className='film-rating__level'>{getScoreLevel(currentFilm.rating)}</span>
          <span className='film-rating__count'>{currentFilm.scoresCount} ratings</span>
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
