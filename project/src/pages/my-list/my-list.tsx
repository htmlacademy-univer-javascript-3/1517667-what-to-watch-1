import { Logo } from '../../components/logo/logo';
import { Footer } from '../../components/footer/footer';
import { UserBlock } from '../../components/user-block/user-block';
import { FilmsList } from '../../components/films-list/films-list';
import { useAppSelector } from '../../hooks';
import { IState } from '../../reducer';

export function MyList() {
  const { allFilms } = useAppSelector((state: IState) => state);

  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <Logo isLight={false} />
        <h1 className='page-title user-page__title'>My list <span className='user-page__film-count'>{allFilms.length}</span></h1>
        <UserBlock />
      </header>
      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>
        <FilmsList films={allFilms} />
      </section>
      <Footer />
    </div>
  );
}
