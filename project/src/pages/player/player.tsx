import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction } from '../../store/api-actions';
import { Spinner } from '../../components/spinner/spinner';
import { NotFoundError } from '../not-found-error/not-found-error';
import { getCurrentFilm, isFilmInLoading } from '../../store/film-data/selectors';

function PlayButton(onClick: () => void) {
  return (
    <button type='button' className='player__play' onClick={onClick}>
      <svg viewBox='0 0 19 19' width='19' height='19'>
        <use xlinkHref='#play-s'></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

function PauseButton(onClick: () => void) {
  return (
    <button type="button" className="player__play" onClick={onClick}>
      <svg viewBox="0 0 14 21" width="14" height="21">
        <use xlinkHref="#pause"></use>
      </svg>
      <span>Pause</span>
    </button>
  );
}

export function Player() {
  // const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [togglerProgress, setTogglerProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('::');
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchFilmAction(id));
    }
    timeLoop();
  }, [id]);
  const dispatch = useAppDispatch();

  const currentFilm = useAppSelector(getCurrentFilm);
  const isFilmLoading = useAppSelector(isFilmInLoading);
  const videoRef = useRef<HTMLVideoElement>(null);

  const updateTogglerProgress = () => {
    if (videoRef.current !== null) {
      const progress = Math.trunc((videoRef.current.currentTime / videoRef.current.duration) * 100);
      setTogglerProgress(progress);
    }
  };

  const getRemainTimeString = () => {
    if (videoRef.current !== null) {
      const remainSeconds = videoRef.current.duration - videoRef.current.currentTime || 0;
      const date = new Date(0);
      date.setSeconds(remainSeconds);
      if (remainSeconds > 3600) {
        setTimeLeft(`-${date.toISOString().substring(11, 19)}`);
      } else {
        setTimeLeft(`-${date.toISOString().substring(14, 19)}`);
      }
    }
  };

  const timeLoop = () => {
    updateTogglerProgress();
    getRemainTimeString();

    setTimeout(timeLoop, 1000);
  };

  if (isFilmLoading) {
    return <Spinner />;
  }

  if (currentFilm === undefined) {
    return <NotFoundError />;
  }

  const playVideo = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <div className='player'>
      <video
        ref={videoRef}
        src={currentFilm.videoLink}
        poster={currentFilm.previewImage}
        className='player__video'
      >
      </video>

      <Link to={`/films/${id}`} className='small-film-card__link'>
        <button type='button' className='player__exit'>Exit</button>
      </Link>

      <div className='player__controls'>
        <div className='player__controls-row'>
          <div className='player__time'>
            <progress className='player__progress' value={togglerProgress} max='100'></progress>
            <div className='player__toggler' style={{ left: `${togglerProgress}%` }}>Toggler</div>
          </div>
          <div className='player__time-value'>{timeLeft}</div>
        </div>

        <div className='player__controls-row'>
          {isPlaying ? PauseButton(() => pauseVideo()) : PlayButton(() => playVideo())}
          <div className='player__name'>Transpotting</div>

          <button type='button' className='player__full-screen'>
            <svg viewBox='0 0 27 27' width='27' height='27'>
              <use xlinkHref='#full-screen'></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
