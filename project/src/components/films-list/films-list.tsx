import React from 'react';
import { store } from '../../store';
import { turnToNextPage } from '../../action';
import { ISmallFilmCardInfo, SmallFilmCard } from '../small-film-card/small-film-card';

export interface IFilmsList {
  films: ISmallFilmCardInfo[]
}

export function FilmsList({ films }: IFilmsList) {
  const [activeId, setActiveId] = React.useState('');

  const makeElementActive = (id: string) => {
    setActiveId(() => id);
  };

  const clearActiveElement = () => {
    setActiveId(() => '');
  };

  if (activeId === undefined) {
    return (<div>F</div>); //eslint's "'activeId' is assigned a value but never used"
  }
  /* eslint-disable no-console */
  console.log(store.getState().isLastPage);
  /* eslint-enable no-console */

  return (
    <>
      <div className='catalog__films-list'>
        {
          films.map((x, index) => (
            <SmallFilmCard
              key={`${x.id}-${index - 1}`}
              imgSrc={x.imgSrc}
              videoPreviewSrc={x.videoPreviewSrc}
              title={x.title}
              id={x.id}
              onHover={makeElementActive}
              onMouseLeave={clearActiveElement}
            />)
          )
        }
      </div>
      {!store.getState().isLastPage &&
        <div className='catalog__more'>
          <button className='catalog__button' type='button' onClick={() => store.dispatch(turnToNextPage())}>Show more
          </button>
        </div>}
    </>
  );
}
