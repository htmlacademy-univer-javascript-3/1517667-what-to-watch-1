import { GenresList } from '../../components/genres-list/genres-list';
import { FilmsList } from '../../components/films-list/films-list';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getPageFilms, isPageLast } from '../../store/general-data/selector';
import { changeGenreAction, turnToNextPageAction } from '../../store/general-data/general-data';
import { useEffect } from 'react';

export function MainPageCatalogue() {
  const isLastPage = useAppSelector(isPageLast);
  const pageFilms = useAppSelector(getPageFilms);
  const dispatch = useAppDispatch();

  const changeGenre = (genre: string) => dispatch(changeGenreAction(genre));
  useEffect(() => {
    changeGenre('All genres');
  }, []);

  return (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>
      <GenresList changeFunction={changeGenre} />
      <FilmsList films={pageFilms} />
      {!isLastPage &&
        <div className='catalog__more'>
          <button className='catalog__button' type='button' onClick={() => dispatch(turnToNextPageAction())}>Show more
          </button>
        </div>}
    </section>
  );
}
