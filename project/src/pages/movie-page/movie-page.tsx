import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { Footer } from '../../components/footer/footer';
import { Logo } from '../../components/logo/logo';
import { UserBlock } from '../../components/user-block/user-block';
import { FilmsList } from '../../components/films-list/films-list';
import { FilmCardDescription } from '../../components/film-card-description/film-card-description';
import { Tabs } from '../../components/tabs/tabs';
import { IFilm, IFilms } from '../../types/IFilmInfo';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

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
        <img src={film.posterImage} alt={film.name} />
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
        <Tabs film={film} />
      </div>
    </div>
  );
}
function PageContent({ films }: IFilms) {
  return (
    <div className='page-content'>
      <section className='catalog catalog--like-this'>
        <h2 className='catalog__title'>More like this</h2>
        <FilmsList films={films} />
      </section>
      <Footer />
    </div>
  );
}

export function Film() {
  const { id } = useParams();
  const { allFilms } = useAppSelector((state) => state);


  if (id === undefined) {
    return <NotFoundError />;
  }

  const film = allFilms[0];
  if (film === undefined) {
    return <NotFoundError />;
  }
  return (
    <div>
      <section className='film-card film-card--full'>
        <FilmCardHero film={film} />
        <FilmCardWrap film={film} />
      </section>
      <PageContent films={allFilms} />
    </div>
  );
}
