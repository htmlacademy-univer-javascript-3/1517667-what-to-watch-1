import React from 'react';
import { IFilmInfo, IFilm } from '../../types/IFilmInfo';
import { IComment } from '../../types/IComment';

export interface ITabs {
  filmId: string;
}

interface ITab {
  id: number;
  title: string;
  child: (x: IFilmInfo) => JSX.Element;
}

export interface IReview {
  text: string;
  author: string;
  datetime: string;
  dateString: string;
  rating: string;
}

function OverviewTab(film: IFilmInfo) {
  return (
    <div>
      <div className='film-rating'>
        <div className='film-rating__score'>{film.rating}</div>
        <p className='film-rating__meta'>
          <span className='film-rating__level'>{film.rating}</span>
          <span className='film-rating__count'>{film.scoresCount}</span>
        </p>
      </div>

      <div className='film-card__text'>
        <p>{film.description}</p>

        <p className='film-card__director'><strong>Director: {film.director}</strong></p>

        <p className='film-card__starring'><strong>Starring: {film.starring.join(', ')} and other</strong></p>
      </div>
    </div>
  );
}

function DetailsTab(film: IFilmInfo) {
  return (
    <div className='film-card__text film-card__row'>
      <div className='film-card__text-col'>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Director</strong>
          <span className='film-card__details-value'>{film.director}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Starring</strong>
          <span className='film-card__details-value'>
            {film.starring.map((item) => <p key={item}>{item}</p>)}
          </span>
        </p>
      </div>

      <div className='film-card__text-col'>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Run Time</strong>
          <span className='film-card__details-value'>{film.runTime}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Genre</strong>
          <span className='film-card__details-value'>{film.genre}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Released</strong>
          <span className='film-card__details-value'>{film.released}</span>
        </p>
      </div>
    </div>
  );
}

function SingleReviewBlock(comment: IComment) {
  return (
    <div className='review'>
      <blockquote className='review__quote'>
        <p className='review__text'>{comment.comment}</p>

        <footer className='review__details'>
          <cite className='review__author'>{comment.user.name}</cite>
          <time className='review__date' dateTime={comment.date}>{comment.date}</time>
        </footer>
      </blockquote>

      <div className='review__rating'>{comment.rating}</div>
    </div>
  );
}

function ReviewsColumn(comments: IComment[]) {
  return (
    <div className='film-card__reviews-col'>
      {comments.map((c) => (<SingleReviewBlock key={`${c.date}-${c.user.id}-${c.rating}`} {...c} />))}
    </div>
  );
}

function ReviewsTab(comments: IComment[]) {
  const middle = Math.round(comments.length / 2);
  const firstColumn = comments.splice(0, middle);
  const secondColumn = comments.splice(middle);
  return (
    <div className='film-card__reviews film-card__row'>
      <ReviewsColumn {...firstColumn} />
      <ReviewsColumn {...secondColumn} />
    </div>
  );
}

const tabs = [
  {
    id: 0,
    title: 'Overview',
    child: OverviewTab
  },
  {
    id: 1,
    title: 'Details',
    child: DetailsTab
  },
  {
    id: 2,
    title: 'Reviews',
    child: ReviewsTab
  }
] as ITab[];

interface ITabHeader {
  title: string;
  onItemClicked: () => void;
}

function TabHeader({ title, onItemClicked }: ITabHeader) {
  return <a className='film-nav__link' onClick={() => onItemClicked()}>{title}</a>;
}

export function Tabs({film} : IFilm) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className='film-card__desc'>
      <nav className='film-nav film-card__nav'>
        <ul className='film-nav__list'>
          {
            tabs.map((x, index) => (
              <li key={x.id} className={`film-nav__item ${activeTab === index && 'film-nav__item--active'}`}>
                <TabHeader
                  title={x.title}
                  onItemClicked={() => setActiveTab(index)}
                />
              </li>
            ))
          }
        </ul>
      </nav>

      {tabs.map((x) => (x.child(film)))[activeTab]}
    </div>
  );
}
