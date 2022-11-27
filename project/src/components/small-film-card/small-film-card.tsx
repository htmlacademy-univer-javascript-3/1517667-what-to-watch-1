import { Link } from 'react-router-dom';
import { VideoPlayer } from '../video-player/video-player';
import { useState } from 'react';
import { IFilmInfo } from '../../types/IFilmInfo';

interface ISmallFilmCard {
  film: IFilmInfo;
  onHover: (id: number) => void;
  onMouseLeave: () => void;
}

export function SmallFilmCard({
  film,
  onHover,
  onMouseLeave
}: ISmallFilmCard) {
  const [hover, setHover] = useState(false);
  let timeout: NodeJS.Timeout | undefined = undefined;

  const mouseEnter = () => {
    onHover(film.id);
    timeout = setTimeout(() => setHover(true), 1000);
  };
  const mouseLeave = () => {
    clearTimeout(timeout);
    setHover(false);
    onMouseLeave();
  };
  return (
    <article className='small-film-card catalog__films-card' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {hover ?
        <VideoPlayer videoSrc={film.previewVideoLink} posterSrc={film.previewImage} /> :
        <img src={film.previewImage} alt={film.name} width='280' height='175' />}
      <h3 className='small-film-card__title'>
        <Link to={`/films/${film.id}`} className='small-film-card__link'>{film.name}</Link>
      </h3>
    </article>
  );
}

