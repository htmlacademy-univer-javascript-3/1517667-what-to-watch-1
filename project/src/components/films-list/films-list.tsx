import { SmallFilmCard } from '../small-film-card/small-film-card';
import { IFilms } from '../../types/IFilmInfo';

export function FilmsList({ films }: IFilms) {
  return (
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
  );
}
