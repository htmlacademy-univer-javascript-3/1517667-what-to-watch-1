import { Logo } from '../../components/logo/logo';
import { UserBlock } from '../../components/user-block/user-block';
import { useParams } from 'react-router-dom';

interface FilmInfo {
  imgSrc: string;
  title: string;
  filmPage: string;
  posterSrc: string;
  posterAlt: string;
}

interface FilmPageInfo {
  title: string;
  filmPage: string;
}

function PageHeader({ filmPage, title }: FilmPageInfo) {
  return (
    <header className='page-header'>
      <Logo isLight={false} />
      <nav className='breadcrumbs'>
        <ul className='breadcrumbs__list'>
          <li className='breadcrumbs__item'>
            <a href={filmPage} className='breadcrumbs__link'>{title}</a>
          </li>
          <li className='breadcrumbs__item'>
            <a className='breadcrumbs__link'>Add review</a>
          </li>
        </ul>
      </nav>

      <UserBlock />
    </header>
  );
}

function FilmCardHeader({
  imgSrc,
  title,
  filmPage,
  posterSrc,
  posterAlt
}: FilmInfo) {
  return (
    <div className='film-card__header'>
      <div className='film-card__bg'>
        <img src={imgSrc} alt={title} />
      </div>
      <h1 className='visually-hidden'>WTW</h1>
      <PageHeader filmPage={filmPage} title={title} />
      <div className='film-card__poster film-card__poster--small'>
        <img src={posterSrc} alt={posterAlt} width='218' height='327' />
      </div>
    </div>
  );
}

function Rating() {
  return (
    <div className='rating'>
      <div className='rating__stars'>
        <input className='rating__input' id='star-10' type='radio' name='rating' value='10' />
        <label className='rating__label' htmlFor='star-10'>Rating 10</label>

        <input className='rating__input' id='star-9' type='radio' name='rating' value='9' />
        <label className='rating__label' htmlFor='star-9'>Rating 9</label>

        <input className='rating__input' id='star-8' type='radio' name='rating' value='8' checked />
        <label className='rating__label' htmlFor='star-8'>Rating 8</label>

        <input className='rating__input' id='star-7' type='radio' name='rating' value='7' />
        <label className='rating__label' htmlFor='star-7'>Rating 7</label>

        <input className='rating__input' id='star-6' type='radio' name='rating' value='6' />
        <label className='rating__label' htmlFor='star-6'>Rating 6</label>

        <input className='rating__input' id='star-5' type='radio' name='rating' value='5' />
        <label className='rating__label' htmlFor='star-5'>Rating 5</label>

        <input className='rating__input' id='star-4' type='radio' name='rating' value='4' />
        <label className='rating__label' htmlFor='star-4'>Rating 4</label>

        <input className='rating__input' id='star-3' type='radio' name='rating' value='3' />
        <label className='rating__label' htmlFor='star-3'>Rating 3</label>

        <input className='rating__input' id='star-2' type='radio' name='rating' value='2' />
        <label className='rating__label' htmlFor='star-2'>Rating 2</label>

        <input className='rating__input' id='star-1' type='radio' name='rating' value='1' />
        <label className='rating__label' htmlFor='star-1'>Rating 1</label>
      </div>
    </div>
  );
}

function AddReviewText() {
  return (
    <div className='add-review__text'>
      <textarea className='add-review__textarea' name='review-text' id='review-text' placeholder='Review text'></textarea>
      <div className='add-review__submit'>
        <button className='add-review__btn' type='submit'>Post</button>
      </div>
    </div>
  );
}

function ReviewDiv() {
  return (
    <div className='add-review'>
      <form action='#' className='add-review__htmlForm'>
        <Rating />
        <AddReviewText />
      </form>
    </div>
  );
}

export function ReviewSection() {
  const params = useParams();
  const imgSrc = `img/${params.id}.jpg`;
  const title = 'The Grand Budapest Hotel'; //temporary The Grand Budapest Hotel data
  const filmPage = '#';
  const posterSrc = 'img/the-grand-budapest-hotel-poster.jpg';
  const posterAlt = 'The Grand Budapest Hotel poster';
  return (
    <section className='film-card film-card--full'>
      <FilmCardHeader imgSrc={imgSrc} title={title} filmPage={filmPage} posterSrc={posterSrc} posterAlt={posterAlt} />
      <ReviewDiv />
    </section>
  );
}
