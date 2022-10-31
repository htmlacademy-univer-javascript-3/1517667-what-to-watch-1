import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { Footer } from '../../components/footer/footer';
import { Logo } from '../../components/logo/logo';
import { UserBlock } from '../../components/user-block/user-block';
import { IGenredFilmsInfo } from '../../components/genres-list/genres-list';
import { FilmsList } from '../../components/films-list/films-list';
import { FilmCardDescription, IFilmCardDesc } from '../../components/film-card-description/film-card-description';
import { Tabs, IFilmDescription } from '../../components/tabs/tabs';
import { useParams } from 'react-router-dom';

export interface IFullDescription extends IFilmDescription {
  title: string;
  image: string;
  imageAlt: string;
}

interface IFilm extends IGenredFilmsInfo {
  filmsToShow: { [id: string]: IFullDescription };
}

function PageHeader() {
  return (
    <header className='page-header film-card__head'>
      <Logo isLight={false} />
      <UserBlock />
    </header>
  );
}

function FilmCardHero({
  id,
  title,
  genre,
  year
}: IFilmCardDesc) {
  return (
    <div className='film-card__hero'>
      <div className='film-card__bg'>
        <img src='img/bg-the-grand-budapest-hotel.jpg' alt={title} />
      </div>
      <h1 className='visually-hidden'>WTW</h1>
      <PageHeader />
      <div className='film-card__wrap'>
        <FilmCardDescription id={id} title={title} genre={genre} year={year} />
      </div>
    </div>
  );
}

function FilmCardWrap(filmDesc: IFullDescription) {
  return (
    <div className='film-card__wrap film-card__translate-top'>
      <div className='film-card__info'>
        <div className='film-card__poster film-card__poster--big'>
          <img src={filmDesc.image} alt={filmDesc.imageAlt} width='218' height='327' />
        </div>
        <Tabs {...filmDesc}/>
      </div>
    </div>
  );
}
function PageContent({ films }: IGenredFilmsInfo) {
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

export function Film({
  filmsToShow,
  films }: IFilm) {
  const { id } = useParams();
  if (id === undefined) {
    return <NotFoundError />;
  }
  const film = filmsToShow[id];
  if (film === undefined) {
    return <NotFoundError />;
  }
  return (
    <div>
      <section className='film-card film-card--full'>
        <FilmCardHero id={id} title={film.title} genre={film.genre} year={film.year} />
        <FilmCardWrap {...film} />
      </section>
      <PageContent films={films} />
    </div>
  );
}
