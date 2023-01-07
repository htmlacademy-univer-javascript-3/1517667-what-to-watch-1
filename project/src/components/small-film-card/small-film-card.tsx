import { Link } from 'react-router-dom';
import { VideoPlayer } from '../video-player/video-player';
import { useState } from 'react';
import { IFilm } from '../../types/IFilmInfo';

export function SmallFilmCard({ film }: IFilm) {
  const [hover, setHover] = useState(false);
  let timeout: NodeJS.Timeout | undefined = undefined;

  const mouseEnter = () => {
    timeout = setTimeout(() => setHover(true), 1000);
  };
  const mouseLeave = () => {
    clearTimeout(timeout);
    setHover(false);
  };
  return (
    <article className='small-film-card catalog__films-card' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <Link className='small-film-card__link' to={`/films/${film.id}`}>
        {hover ?
          <VideoPlayer videoSrc={film.previewVideoLink} posterSrc={film.previewImage} /> :
          <img src={film.previewImage} alt={film.name} width='280' height='175' />}
        <h3 className='small-film-card__title'>{film.name}</h3>
      </Link>
    </article >
  );
}

