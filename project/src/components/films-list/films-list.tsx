import { store } from '../../store';
import { turnToNextPageAction } from '../../store/general-data/general-data';
import { SmallFilmCard } from '../small-film-card/small-film-card';
import { useAppSelector } from '../../hooks';
import { IFilms } from '../../types/IFilmInfo';
import { isPageLast } from '../../store/general-data/selector';

export function FilmsList({ films }: IFilms) {
  const isLastPage = useAppSelector(isPageLast);

  return (
    <>
      <div className='catalog__films-list'>
        {
          films.map((film, index) => (
            <SmallFilmCard
              key={`${film.id}-${index - 1}`}
              film={film}
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
