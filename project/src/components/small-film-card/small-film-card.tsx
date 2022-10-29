import { Link } from 'react-router-dom';
import { VideoPlayer } from '../video-player/video-player';
import { useState } from 'react';

export interface ISmallFilmCardInfo {
  id: string;
  imgSrc: string;
  videoPreviewSrc: string;
  title: string;
}

interface ISmallFilmCard extends ISmallFilmCardInfo {
  onHover: (id: string) => void;
  onMouseLeave: () => void;
}

export function SmallFilmCard({
  id,
  imgSrc,
  videoPreviewSrc,
  title,
  onHover,
  onMouseLeave
}: ISmallFilmCard) {
  const [hover, setHover] = useState(false);
  let timeout: NodeJS.Timeout | undefined = undefined;

  const mouseEnter = () => {
    onHover(id);
    timeout = setTimeout(() => setHover(true), 1000);
  };
  const mouseLeave = () => {
    clearTimeout(timeout);
    setHover(false);
    onMouseLeave();
  };
  return (
    <article className='small-film-card catalog__films-card' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {hover ? <VideoPlayer videoSrc={videoPreviewSrc} posterSrc={imgSrc} /> : <img src={imgSrc} alt={title} width='280' height='175' />}
      <h3 className='small-film-card__title'>
        <Link to={`/films/${id}`} className='small-film-card__link'>{title}</Link>
      </h3>
    </article>
  );
}

