import React from 'react';
import { Logo } from '../../components/logo/logo';
import { UserBlock } from '../../components/user-block/user-block';
import { useParams } from 'react-router-dom';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { Link } from 'react-router-dom';

interface FilmInfo {
  id: string;
  imgSrc: string;
  title: string;
  posterSrc: string;
  posterAlt: string;
}

interface FilmPageInfo {
  title: string;
  id: string;
}

function PageHeader({ id, title }: FilmPageInfo) {
  return (
    <header className='page-header'>
      <Logo isLight={false} />
      <nav className='breadcrumbs'>
        <ul className='breadcrumbs__list'>
          <li className='breadcrumbs__item'>
            <Link to={`/film/${id}`} className='breadcrumbs__link'>{title}</Link>
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
  id,
  imgSrc,
  title,
  posterSrc,
  posterAlt
}: FilmInfo) {
  return (
    <div className='film-card__header'>
      <div className='film-card__bg'>
        <img src={imgSrc} alt={title} />
      </div>
      <h1 className='visually-hidden'>WTW</h1>
      <PageHeader id={id} title={title} />
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

interface IReview {
  value: string;
  onTyping: React.Dispatch<React.ChangeEvent<HTMLTextAreaElement>>;
}

function ReviewDiv({ value, onTyping }: IReview) {
  return (
    <div className='add-review'>
      <form action='#' className='add-review__htmlForm'>
        <Rating />
        <div className='add-review__text'>
          <textarea
            className='add-review__textarea'
            name='review'
            id='review'
            value={value}
            placeholder='Review text'
            onChange={onTyping}
          >
          </textarea>
          <div className='add-review__submit'>
            <button className='add-review__btn' type='submit'>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export const ReviewSection = () => {
  const { id } = useParams();
  const [review, setReview] = React.useState('');

  if (id === undefined) {
    return <NotFoundError />;
  }

  const imgSrc = `img/${id}.jpg`;
  const posterSrc = `img/${id}.jpg`;
  const posterAlt = `${id} poster`;

  const handleReviewChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  return (
    <section className='film-card film-card--full'>
      <FilmCardHeader id={id} imgSrc={imgSrc} title={id} posterSrc={posterSrc} posterAlt={posterAlt} />
      <div>
        <label htmlFor="review">My Textarea</label>
        <ReviewDiv value={review} onTyping={handleReviewChange}/>
      </div>
    </section>
  );
};
