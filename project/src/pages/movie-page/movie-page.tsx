import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { Footer } from '../../components/footer/footer';
import { Logo } from '../../components/logo/logo';
import { UserBlock } from '../../components/user-block/user-block';
import { IFilmsList, FilmsList } from '../../components/films-list/films-list';
import { ISmallFilmCardInfo } from '../../components/small-film-card/small-film-card';
import { FilmCardDescription, IFilmCardDesc } from '../../components/film-card-description/film-card-description';
import { useParams } from 'react-router-dom';

interface IFilmDescription {
  image: string;
  director: string;
  actors: string;
  description: string[];
  ratingScore: string;
  ratingLevel: string;
  ratingsCount: string;
}

export interface IFullDescription extends IFilmDescription {
  title: string;
  genre: string;
  year: string;
}

interface IFilm {
  filmsToShow: { [id: string]: IFullDescription };
  otherFilms: ISmallFilmCardInfo[];
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

function FilmCardWrap({ ratingScore, ratingLevel, ratingsCount, image, director, actors, description }: IFilmDescription) {
  return (
    <div className='film-card__wrap film-card__translate-top'>
      <div className='film-card__info'>
        <div className='film-card__poster film-card__poster--big'>
          <img src={image} alt='The Grand Budapest Hotel poster' width='218' height='327' />
        </div>
        <div className='film-card__desc'>
          <nav className='film-nav film-card__nav'>
            <ul className='film-nav__list'>
              <li className='film-nav__item film-nav__item--active'>
                <a href='#' className='film-nav__link'>Overview</a>
              </li>
              <li className='film-nav__item'>
                <a href='#' className='film-nav__link'>Details</a>
              </li>
              <li className='film-nav__item'>
                <a href='#' className='film-nav__link'>Reviews</a>
              </li>
            </ul>
          </nav>

          <div className='film-rating'>
            <div className='film-rating__score'>{ratingScore}</div>
            <p className='film-rating__meta'>
              <span className='film-rating__level'>{ratingLevel}</span>
              <span className='film-rating__count'>{ratingsCount}</span>
            </p>
          </div>

          <div className='film-card__text'>
            {description.map((item) => <p key={item}>{item}</p>)}

            <p className='film-card__director'><strong>Director: {director}</strong></p>

            <p className='film-card__starring'><strong>Starring: {actors} and other</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
function PageContent({ films }: IFilmsList) {
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
  otherFilms }: IFilm) {
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
      <PageContent films={otherFilms} />
    </div>
  );
}
