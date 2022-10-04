import { Logo } from '../../components/logo/logo';
import { Footer } from '../../components/footer/footer';
import { UserBlock } from '../../components/userBlock/userBlock';
import { IFilmsList, FilmsList } from '../../components/filmsList/filmsList';

function HeaderMyList() {
  return (
    <header className='page-header user-page__head'>
      <Logo isLight={false} />
      <h1 className='page-title user-page__title'>My list <span className='user-page__film-count'>9</span></h1>
      <UserBlock />
    </header>
  );
}

export function MyList({ films }: IFilmsList) {
  return (
    <div className='user-page'>
      <HeaderMyList />
      <FilmsList films={films} />
      <Footer />
    </div>
  );
}
