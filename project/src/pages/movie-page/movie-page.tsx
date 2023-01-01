import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { Footer } from '../../components/footer/footer';
import { Logo } from '../../components/logo/logo';
import { UserBlock } from '../../components/user-block/user-block';
import { FilmsList } from '../../components/films-list/films-list';
import { FilmCardDescription } from '../../components/film-card-description/film-card-description';
import { Tabs } from '../../components/tabs/tabs';
import { IFilm } from '../../types/IFilmInfo';
import { Spinner } from '../../components/spinner/spinner';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchFilmAction, fetchSimilarAction } from '../../store/api-actions';
import { getCurrentFilm, isFilmInLoading, getSimilarFilms, areSimilarInLoading } from '../../store/film-data/selectors';

function PageHeader() {
  return (
    <header className='page-header film-card__head'>
      <Logo isLight={false} />
      <UserBlock />
    </header>
  );
}

function FilmCardHero({ film }: IFilm) {
  return (
    <div className='film-card__hero'>
      <div className='film-card__bg'>
        <img src={film.backgroundImage} alt={film.name} />
      </div>
      <h1 className='visually-hidden'>WTW</h1>
      <PageHeader />
      <div className='film-card__wrap'>
        <FilmCardDescription film={film} />
      </div>
    </div>
  );
}

function FilmCardWrap({ film }: IFilm) {
  return (
    <div className='film-card__wrap film-card__translate-top'>
      <div className='film-card__info'>
        <div className='film-card__poster film-card__poster--big'>
          <img src={film.posterImage} alt={film.name} width='218' height='327' />
        </div>
        <Tabs />
      </div>
    </div>
  );
}

function PageContent() {
  const similarFilms = useAppSelector(getSimilarFilms).slice(0, 4);
  const areSimilarLoading = useAppSelector(areSimilarInLoading);

  if (areSimilarLoading) {
    return null;
  }

  return (
    <div className='page-content'>
      <section className='catalog catalog--like-this'>
        <h2 className='catalog__title'>More like this</h2>
        <FilmsList films={similarFilms} />
      </section>
      <Footer />
    </div>
  );
}

export function Film() {
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchFilmAction(id));
      dispatch(fetchSimilarAction(id));
    }
  }, [id]);

  const dispatch = useAppDispatch();

  const currentFilm = useAppSelector(getCurrentFilm);
  const isFilmLoading = useAppSelector(isFilmInLoading);

  if (isFilmLoading) {
    return <Spinner />;
  }

  if (id === undefined || currentFilm === undefined || getSimilarFilms === undefined) {
    return <NotFoundError />;
  }
  return (
    <div>
      <section className='film-card film-card--full'>
        <FilmCardHero film={currentFilm} />
        <FilmCardWrap film={currentFilm} />
      </section>
      <PageContent />
    </div>
  );
}
