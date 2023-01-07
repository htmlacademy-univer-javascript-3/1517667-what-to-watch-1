import { Logo } from '../../components/logo/logo';
import { Footer } from '../../components/footer/footer';
import { UserBlock } from '../../components/user-block/user-block';
import { IFilm } from '../../types/IFilmInfo';
import { FilmCardWrap } from '../../components/film-card-wrap/film-card-wrap';
import { FilmCardDescription } from '../../components/film-card-description/film-card-description';
import { NotFoundError } from '../not-found-error/not-found-error';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPromoFilm, isPromoLoading } from '../../store/general-data/selector';
import { areFavoriteFilmsOutdated, areFavoriteFilmsInLoading } from '../../store/favorite-data/selectors';
import { MainPageCatalogue } from './main-page-catalogue';
import { Spinner } from '../../components/spinner/spinner';
import { useEffect } from 'react';
import { setPromoFilmInfo, getFavoriteFilmsAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';
import { AuthorizationStatus } from '../../components/private-route/private-route';

function Header() {
  return (
    <header className='page-header film-card__head'>
      <Logo isLight={false} />
      <UserBlock />
    </header>
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
      <FilmCardWrap film={film} fromFilmPage={false} >
        <FilmCardDescription film={film} />
      </FilmCardWrap>
    </section>
  );
}

export function MainPage() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const favoritesOutdated = useAppSelector(areFavoriteFilmsOutdated);
  useEffect(() => {
    dispatch(setPromoFilmInfo());
    if (authStatus === AuthorizationStatus.Auth && favoritesOutdated) {
      dispatch(getFavoriteFilmsAction());
    }
  }, []);
  const promo = useAppSelector(getPromoFilm);
  const promoLoading = useAppSelector(isPromoLoading);
  const favoritesLoading = useAppSelector(areFavoriteFilmsInLoading);
  if (promoLoading || favoritesLoading) {
    return <Spinner />;
  }

  if (!promo) {
    return <NotFoundError />;
  }

  return (
    <div>
      <FilmCard film={promo} />
      <div className='page-content'>
        <MainPageCatalogue />
        <Footer />
      </div>
    </div>
  );
}
