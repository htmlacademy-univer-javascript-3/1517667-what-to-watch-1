import { Link } from 'react-router-dom';
import { VideoPlayer } from '../video-player/video-player';

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
  return (
    <article className='small-film-card catalog__films-card' onMouseEnter={() => { onHover(id); }} onMouseLeave={() => onMouseLeave()}>
      <VideoPlayer videoSrc={videoPreviewSrc} posterSrc={imgSrc} />
      <h3 className='small-film-card__title'>
        <Link to={`/films/${id}`} className='small-film-card__link'>{title}</Link>
      </h3>
    </article>
  );
}

