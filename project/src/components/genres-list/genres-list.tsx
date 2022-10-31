import { store } from '../../store';
import { changeGenreAction } from '../../action';
import { IGenredCardFilm } from '../../mocks/films-lists';

export interface IGenredFilmsInfo {
  films: IGenredCardFilm[]
}

export function GenresList({films} : IGenredFilmsInfo) {
  const genres = ['All genres'];
  const propsGenresOnly = films.map((f) => f.genre);
  genres.push(...new Set(propsGenresOnly));

  return (
    <ul className='catalog__genres-list'>
      {
        genres.map((genre, index) => (
          <li id={genre} key={genre} className={`catalog__genres-item ${index === 0 ? 'catalog__genres-item--active' : ''}`}>
            <a
              className='catalog__genres-link'
              onClick={() => {

                const currentGenre = store.getState().genre;

                if (genre !== currentGenre) {
                  document.getElementById(currentGenre)?.classList.remove('catalog__genres-item--active');
                  store.dispatch(changeGenreAction(genre));
                  document.getElementById(genre)?.classList.add('catalog__genres-item--active');
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
