import { ISmallFilmCard, SmallFilmCard } from '../smallFilmCard/smallFilmCard';

export interface IFilmsList {
  films: ISmallFilmCard[]
}

export function FilmsList({ films }: IFilmsList) {
  return (
    <div className='catalog__films-list'>
      {
        films.map((x, index) => (
          <SmallFilmCard key={x.title} imgSrc={x.imgSrc} title={x.title} />)
        )
      }
    </div>
  );
}
