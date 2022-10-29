import React from 'react';

export interface ITabs {
  filmId: string;
}

interface ITab {
  id: number;
  title: string;
  child: (x: IFilmDescription) => JSX.Element;
}

export interface IReview {
  text: string;
  author: string;
  datetime: string;
  dateString: string;
  rating: string;
}

export interface IFilmDescription {
  director: string;
  actors: string[];
  description: string[];
  ratingScore: string;
  ratingLevel: string;
  ratingsCount: string;
  time: string;
  genre: string;
  year: string;
  reviews: IReview[];
}

function OverviewTab(desc: IFilmDescription) {
  return (
    <div>
      <div className='film-rating'>
        <div className='film-rating__score'>{desc.ratingScore}</div>
        <p className='film-rating__meta'>
          <span className='film-rating__level'>{desc.ratingLevel}</span>
          <span className='film-rating__count'>{desc.ratingsCount}</span>
        </p>
      </div>

      <div className='film-card__text'>
        {desc.description.map((item) => <p key={item}>{item}</p>)}

        <p className='film-card__director'><strong>Director: {desc.director}</strong></p>

        <p className='film-card__starring'><strong>Starring: {desc.actors.join(', ')} and other</strong></p>
      </div>
    </div>
  );
}

function DetailsTab(desc: IFilmDescription) {
  return (
    <div className='film-card__text film-card__row'>
      <div className='film-card__text-col'>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Director</strong>
          <span className='film-card__details-value'>{desc.director}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Starring</strong>
          <span className='film-card__details-value'>
            {desc.actors.map((item) => <p key={item}>{item}</p>)}
          </span>
        </p>
      </div>

      <div className='film-card__text-col'>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Run Time</strong>
          <span className='film-card__details-value'>{desc.time}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Genre</strong>
          <span className='film-card__details-value'>{desc.genre}</span>
        </p>
        <p className='film-card__details-item'>
          <strong className='film-card__details-name'>Released</strong>
          <span className='film-card__details-value'>{desc.year}</span>
        </p>
      </div>
    </div>
  );
}

function SingleReviewBlock(data: IReview) {
  return (
    <div className='review'>
      <blockquote className='review__quote'>
        <p className='review__text'>{data.text}</p>

        <footer className='review__details'>
          <cite className='review__author'>{data.author}</cite>
          <time className='review__date' dateTime={data.datetime}>{data.dateString}</time>
        </footer>
      </blockquote>

      <div className='review__rating'>{data.rating}</div>
    </div>
  );
}

function ReviewsColumn(reviews: IReview[]) {
  return (
    <div className='film-card__reviews-col'>
      {reviews.map((r) => (<SingleReviewBlock key={`${r.datetime}-${r.author}-${r.rating}`} {...r} />))}
    </div>
  );
}

function ReviewsTab(desc: IFilmDescription) {
  const middle = Math.round(desc.reviews.length / 2);
  const firstColumn = desc.reviews.splice(0, middle) as IReview[];
  const secondColumn = desc.reviews.splice(middle);
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

export function Tabs(desc: IFilmDescription) {
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

      {tabs.map((x) => (x.child(desc)))[activeTab]}
    </div>
  );
}
