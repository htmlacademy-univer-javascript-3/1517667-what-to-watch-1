import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Spinner } from '../../components/spinner/spinner';
import { fetchFilmAction, fetchSimilarAction } from '../../store/api-actions';
import { IFilm } from '../../types/IFilmInfo';
import { getCurrentFilm, isFilmInLoading } from '../../store/film-data/selectors';
import { ReviewPageHeader } from './review-page-header';
import { ReviewEditor } from './review-editor';

function FilmCardHeader({ film }: IFilm) {
  return (
    <div className='film-card__header'>
      <div className='film-card__bg'>
        <img src={film.backgroundImage} alt={film.name} />
      </div>
      <h1 className='visually-hidden'>WTW</h1>
      <ReviewPageHeader film={film} />
      <div className='film-card__poster film-card__poster--small'>
        <img src={film.posterImage} alt={film.name} width='218' height='327' />
      </div>
    </div>
  );
}

export const ReviewSection = () => {
  const { id } = useParams();
  const currentFilm = useAppSelector(getCurrentFilm);
  const isFilmLoading = useAppSelector(isFilmInLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id !== undefined && id !== currentFilm?.id.toString()) {
      dispatch(fetchFilmAction(id));
      dispatch(fetchSimilarAction(id));
    }
  }, [id]);

  if (id === undefined || currentFilm === undefined) {
    return <NotFoundError />;
  }

  if (isFilmLoading) {
    return <Spinner />;
  }

  return (
    <section className='film-card film-card--full'>
      <FilmCardHeader film={currentFilm} />
      <div>
        <ReviewEditor filmId={currentFilm.id} />
      </div>
    </section>
  );
};
