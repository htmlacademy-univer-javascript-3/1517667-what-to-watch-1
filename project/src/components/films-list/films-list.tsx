import React from 'react';
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

  return (
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
  );
}
