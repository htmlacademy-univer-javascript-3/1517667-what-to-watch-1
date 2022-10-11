import { Logo } from '../../components/logo/logo';
import { Footer } from '../../components/footer/footer';
import { UserBlock } from '../../components/user-block/user-block';
import { IFilmsList, FilmsList } from '../../components/films-list/films-list';

export function MyList({ films }: IFilmsList) {
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
