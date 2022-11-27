import React from 'react';
import { store } from '../../store';
import { turnToNextPageAction } from '../../action';
import { SmallFilmCard } from '../small-film-card/small-film-card';
import { useAppSelector } from '../../hooks';
import { IFilms } from '../../types/IFilmInfo';

export function FilmsList({ films }: IFilms) {
  const [activeId, setActiveId] = React.useState(0);
  const { isLastPage } = useAppSelector((state) => state);

  const makeElementActive = (id: number) => {
    if (id !== activeId) {
      setActiveId(() => id);
    }
  };

  const clearActiveElement = () => {
    setActiveId(() => 0);
  };

  return (
    <>
      <div className='catalog__films-list'>
        {
          films.map((x, index) => (
            <SmallFilmCard
              key={`${x.id}-${index - 1}`}
              film={x}
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
