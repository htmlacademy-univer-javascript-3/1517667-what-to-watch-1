import { Link } from 'react-router-dom';

export interface ISmallFilmCardInfo {
  id: string;
  imgSrc: string;
  title: string;
}

interface ISmallFilmCard extends ISmallFilmCardInfo {
  onHover: (id: string) => void;
  onMouseLeave: () => void;
}

export function SmallFilmCard({
  imgSrc,
  title,
  id,
  onHover,
  onMouseLeave
}: ISmallFilmCard) {
  return (
    <article className='small-film-card catalog__films-card' onMouseEnter={() => { onHover(id); }} onMouseLeave={() => onMouseLeave()}>
      <div className='small-film-card__image'>
        <img src={imgSrc} alt={title} width='280' height='175' />
      </div>
      <h3 className='small-film-card__title'>
        <Link to={`/films/${id}`} className='small-film-card__link'>{title}</Link>
      </h3>
    </article>
  );
}

