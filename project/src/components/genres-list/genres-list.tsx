
import { useAppSelector } from '../../hooks';
import { getGenres, getCurrentGenre } from '../../store/general-data/selector';

interface IGenresList {
  changeFunction: (genre: string) => void;
}

export function GenresList({ changeFunction } : IGenresList) {
  const genresList = useAppSelector(getGenres).slice(0, 10);
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
                  changeFunction(genre);
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
