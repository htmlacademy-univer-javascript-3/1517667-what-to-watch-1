import { store } from '../../store';
import { changeGenreAction } from '../../action';
import { useAppSelector } from '../../hooks';

export function GenresList() {
  const { genresList, currentGenre } = useAppSelector((state) => state);

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
