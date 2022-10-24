import { useRef } from 'react';

export interface IVideoPlayer {
  videoSrc: string;
  posterSrc: string;
}

export function VideoPlayer({
  videoSrc,
  posterSrc
}: IVideoPlayer) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    if (videoRef.current !== null) {
      setTimeout(() => {videoRef.current?.play();}, 1000);
    }
  };

  const pause = () => {
    if (videoRef.current !== null) {
      videoRef.current.load();
    }
  };
  return (
    <video
      className='small-film-card__image'
      ref={videoRef}
      muted
      src={videoSrc}
      poster={posterSrc}
      onMouseEnter={() => { play(); }}
      onMouseLeave={() => { pause(); }}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
  /* eslint-enable no-console */
}
