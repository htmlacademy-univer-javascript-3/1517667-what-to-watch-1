import { NotFoundError } from '../not-found-error/not-found-error';
import { Logo } from '../../components/logo/logo';
import { UserBlock } from '../../components/user-block/user-block';
import { FilmCardDescription } from '../../components/film-card-description/film-card-description';
import { FilmCardWrap } from '../../components/film-card-wrap/film-card-wrap';
import { Tabs } from '../../components/tabs/tabs';
import { IFilm } from '../../types/IFilmInfo';
import { Spinner } from '../../components/spinner/spinner';
import { SimilarFilms } from '../../components/similar-films/similar-films';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchFilmAction, fetchSimilarAction } from '../../store/api-actions';
import { getCurrentFilm, isFilmInLoading } from '../../store/film-data/selectors';

function FilmCardHero({ film }: IFilm) {
  return (
    <div className='film-card__hero'>
      <div className='film-card__bg'>
        <img src={film.backgroundImage} alt={film.name} />
      </div>
      <h1 className='visually-hidden'>WTW</h1>
      <header className='page-header film-card__head'>
        <Logo isLight={false} />
        <UserBlock />
      </header>
      <div className='film-card__wrap'>
        <FilmCardDescription film={film} />
      </div>
    </div>
  );
}

export function FilmPage() {
  const { id } = useParams();
  const currentFilm = useAppSelector(getCurrentFilm);
  useEffect(() => {
    if (id !== undefined && id !== currentFilm?.id.toString()) {
      dispatch(fetchFilmAction(id));
      dispatch(fetchSimilarAction(id));
    }
  }, [id]);

  const dispatch = useAppDispatch();

  const isFilmLoading = useAppSelector(isFilmInLoading);

  if (isFilmLoading) {
    return <Spinner />;
  }

  if (id === undefined || currentFilm === undefined) {
    return <NotFoundError />;
  }
  return (
    <div>
      <section className='film-card film-card--full'>
        <FilmCardHero film={currentFilm} />
        <FilmCardWrap film={currentFilm} fromFilmPage>
          <Tabs />
        </FilmCardWrap>
      </section>
      <SimilarFilms />
    </div>
  );
}
