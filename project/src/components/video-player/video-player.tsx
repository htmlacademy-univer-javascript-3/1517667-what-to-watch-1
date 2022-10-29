import { useRef, useEffect } from 'react';

export interface IVideoPlayer {
  videoSrc: string;
  posterSrc: string;
}

export function VideoPlayer({
  videoSrc,
  posterSrc
}: IVideoPlayer) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.load();
    videoRef.current?.play();
    return () => videoRef.current?.pause();
  });
  
  return (
    <video
      className='small-film-card__image'
      ref={videoRef}
      muted
      src={videoSrc}
      poster={posterSrc}
      // onMouseEnter={() => { play(); }}
      // onMouseLeave={() => { pause(); }}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
  /* eslint-enable no-console */
}
