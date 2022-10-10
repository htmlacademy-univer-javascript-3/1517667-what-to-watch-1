import React from 'react';
import { Logo } from '../../components/logo/logo';
import { Footer } from '../../components/footer/footer';
import { IFilmsList, FilmsList } from '../../components/films-list/films-list';
import { UserBlock } from '../../components/user-block/user-block';
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

        <FilmCardDescription title={title} genre={genre} year={year} />
      </div>
    </div>
  );
}

function FilmCard({
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
      <FilmCardWrap title={title} genre={genre} year={year} />
    </section>
  );
}

function GenresList() {
  const genres = [
    'All genres', 'Comedies', 'Crime', 'Documentary', 'Dramas', 'Horror',
    'Kids & Family', 'Romance', 'Sci-Fi', 'Thrillers'
  ];
  return (
    <ul className='catalog__genres-list'>
      {
        genres.map((genre, index) => (
          <li key={genre} className={`catalog__genres-item ${index === 0 ? '' : 'catalog__genres-item--active'}`}>
            <a href='#' className='catalog__genres-link'>{genre}</a>
          </li>)
        )
      }
    </ul>
  );
}

function Catalog({films} : IFilmsList) {
  return (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>
      <GenresList />
      <FilmsList films={films}/>
      <div className='catalog__more'>
        <button className='catalog__button' type='button'>Show more</button>
      </div>
    </section>
  );
}

function PageContent({films} : IFilmsList) {
  return (
    <div className='page-content'>
      <Catalog films={films}/>
      <Footer />
    </div>
  );
}

export function MainPage({films} : IFilmsList) {
  return (
    <div>
      <FilmCard title='The Grand Budapest Hotel' genre='Drama' year='2014' posterSrc='img/bg-the-grand-budapest-hotel.jpg' posterAlt='The Grand Budapest Hotel' />
      <PageContent films={films}/>
    </div>
  );
}
