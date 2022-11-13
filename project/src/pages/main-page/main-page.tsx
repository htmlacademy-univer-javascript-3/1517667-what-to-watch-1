import { Logo } from '../../components/logo/logo';
import { Footer } from '../../components/footer/footer';
import { IGenredFilmsInfo } from '../../components/genres-list/genres-list';
import { UserBlock } from '../../components/user-block/user-block';
import { GenresList } from '../../components/genres-list/genres-list';
import { FilmsList } from '../../components/films-list/films-list';
import { useSelector } from 'react-redux';
import { IState } from '../../reducer';
import { FilmCardDescription, IFilmCard, IFilmCardDesc } from '../../components/film-card-description/film-card-description';

function Header() {
  return (
    <header className='page-header film-card__head'>
      <Logo isLight={false} />
      <UserBlock />
    </header>
  );
}

function FilmCardWrap({
  id,
  title,
  genre,
  year
}: IFilmCardDesc) {
  return (
    <div className='film-card__wrap'>
      <div className='film-card__info'>
        <div className='film-card__poster'>
          <img src='img/the-grand-budapest-hotel-poster.jpg' alt='The Grand Budapest Hotel poster' width='218' height='327' />
        </div>

        <FilmCardDescription id={id} title={title} genre={genre} year={year} />
      </div>
    </div>
  );
}

function FilmCard({
  id,
  title,
  genre,
  year,
  posterSrc,
  posterAlt
}: IFilmCard) {
  return (
    <section className='film-card'>
      <div className='film-card__bg'>
        <img src={posterSrc} alt={posterAlt} />
      </div>
      <h1 className='visually-hidden'>WTW</h1>
      <Header />
      <FilmCardWrap id={id} title={title} genre={genre} year={year} />
    </section>
  );
}

function Catalog({films} : IGenredFilmsInfo) {
  const genredFilms = useSelector((state: IState) => state.films);
  return (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>
      <GenresList films={films}/>
      <FilmsList films={genredFilms}/>
    </section>
  );
}

function PageContent({films} : IGenredFilmsInfo) {
  return (
    <div className='page-content'>
      <Catalog films={films}/>
      <Footer />
    </div>
  );
}

export function MainPage({films} : IGenredFilmsInfo) {
  return (
    <div>
      <FilmCard id='the-grand-budapest-hotel' title='The Grand Budapest Hotel' genre='Drama' year='2014' posterSrc='img/bg-the-grand-budapest-hotel.jpg' posterAlt='The Grand Budapest Hotel' />
      <PageContent films={films}/>
    </div>
  );
}
