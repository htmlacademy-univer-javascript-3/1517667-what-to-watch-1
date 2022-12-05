import { store } from '../../store';
import { changeGenreAction } from '../../store/general-data/general-data';
import { useAppSelector } from '../../hooks';
import { getGenres, getCurrentGenre } from '../../store/general-data/selector';

export function GenresList() {
  const genresList = useAppSelector(getGenres);
  const currentGenre = useAppSelector(getCurrentGenre);

  return (
    <ul className='catalog__genres-list'>
      {
        genresList.map((genre) => (
          <li id={genre} key={genre} className={`catalog__genres-item ${genre === currentGenre ? 'catalog__genres-item--active' : ''}`}>
            <a
              className='catalog__genres-link'
              onClick={() => {
                if (genre !== currentGenre) {
                  store.dispatch(changeGenreAction(genre));
                }
              }}
            >
              {genre}
            </a>
          </li>)
        )
      }
    </ul >
  );
}
