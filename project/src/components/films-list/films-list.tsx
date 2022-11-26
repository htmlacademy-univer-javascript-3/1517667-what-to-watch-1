import React from 'react';
import { store } from '../../store';
import { turnToNextPageAction } from '../../action';
import { SmallFilmCard } from '../small-film-card/small-film-card';
import { useAppSelector } from '../../hooks';
import { IFilms } from '../../types/IFilmInfo';

export function FilmsList({ films }: IFilms) {
  const [activeId, setActiveId] = React.useState('');
  const { isLastPage } = useAppSelector((state) => state);

  const makeElementActive = (id: string) => {
    if (id !== activeId) {
      setActiveId(() => id);
    }
  };

  const clearActiveElement = () => {
    setActiveId(() => '');
  };

  return (
    <>
      <div className='catalog__films-list'>
        {
          films.map((x, index) => (
            <SmallFilmCard
              key={`${x.id}-${index - 1}`}
              imgSrc={x.posterImage}
              videoPreviewSrc={x.previewVideoLink}
              title={x.name}
              id={x.name}
              onHover={makeElementActive}
              onMouseLeave={clearActiveElement}
            />)
          )
        }
      </div>
      {!isLastPage &&
        <div className='catalog__more'>
          <button className='catalog__button' type='button' onClick={() => store.dispatch(turnToNextPageAction())}>Show more
          </button>
        </div>}
    </>
  );
}
