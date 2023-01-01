import { Logo } from '../../components/logo/logo';
import { Footer } from '../../components/footer/footer';
import { UserBlock } from '../../components/user-block/user-block';
import { GenresList } from '../../components/genres-list/genres-list';
import { FilmsList } from '../../components/films-list/films-list';
import { IFilm } from '../../types/IFilmInfo';
import { FilmCardDescription } from '../../components/film-card-description/film-card-description';
import { NotFoundError } from '../not-found-error/not-found-error';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getPromoFilm, isPromoLoading, getPageFilms, isPageLast } from '../../store/general-data/selector';
import { changeGenreAction, turnToNextPageAction } from '../../store/general-data/general-data';
import { Spinner } from '../../components/spinner/spinner';
import { useEffect } from 'react';

function Header() {
  return (
    <header className='page-header film-card__head'>
      <Logo isLight={false} />
      <UserBlock />
    </header>
  );
}

function FilmCardWrap({ film }: IFilm) {
  return (
    <div className='film-card__wrap'>
      <div className='film-card__info'>
        <div className='film-card__poster'>
          <img src={film.posterImage} alt={film.name} width='218' height='327' />
        </div>

        <FilmCardDescription film={film} />
      </div>
    </div>
  );
}

function FilmCard({ film }: IFilm) {
  return (
    <section className='film-card'>
      <div className='film-card__bg'>
        <img src={film.backgroundImage} alt={film.name} />
      </div>
      <h1 className='visually-hidden'>WTW</h1>
      <Header />
      <FilmCardWrap film={film} />
    </section>
  );
}

function Catalog() {
  const isLastPage = useAppSelector(isPageLast);
  const pageFilms = useAppSelector(getPageFilms);
  const dispatch = useAppDispatch();

  const changeGenre = (genre: string) => dispatch(changeGenreAction(genre));
  useEffect(() => {
    changeGenre('All genres');
  }, []);

  return (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>
      <GenresList changeFunction={changeGenre}/>
      <FilmsList films={pageFilms} />
      {!isLastPage &&
        <div className='catalog__more'>
          <button className='catalog__button' type='button' onClick={() => dispatch(turnToNextPageAction())}>Show more
          </button>
        </div>}
    </section>
  );
}

export function MainPage() {
  const promo = useAppSelector(getPromoFilm);
  const promoLoading = useAppSelector(isPromoLoading);
  if (promoLoading) {
    return <Spinner />;
  }

  if (!promo) {
    return <NotFoundError />;
  }

  return (
    <div>
      <FilmCard film={promo} />
      <div className='page-content'>
        <Catalog />
        <Footer />
      </div>
    </div>
  );
}
