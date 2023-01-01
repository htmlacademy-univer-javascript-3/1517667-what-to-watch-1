import { Logo } from '../../components/logo/logo';
import { Footer } from '../../components/footer/footer';
import { Spinner } from '../../components/spinner/spinner';
import { UserBlock } from '../../components/user-block/user-block';
import { FilmsList } from '../../components/films-list/films-list';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFavoriteFilms, areFavoriteFilmsInLoading, areFavoriteFilmsOutdated } from '../../store/favorite-data/selectors';
// import { store } from '../../store';
import { getFavoriteFilmsAction } from '../../store/api-actions';

// store.dispatch(getFavoriteFilmsAction());

export function MyList() {
  const areFavoriteOutdated = useAppSelector(areFavoriteFilmsOutdated);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (areFavoriteOutdated) {
      dispatch(getFavoriteFilmsAction());
    }
  });

  const films = useAppSelector(getFavoriteFilms);
  const areInLoading = useAppSelector(areFavoriteFilmsInLoading);

  if (areInLoading) {
    return <Spinner />;
  }

  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <Logo isLight={false} />
        <h1 className='page-title user-page__title'>My list <span className='user-page__film-count'>{films.length}</span></h1>
        <UserBlock />
      </header>
      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>
        <FilmsList films={films} />
      </section>
      <Footer />
    </div>
  );
}
