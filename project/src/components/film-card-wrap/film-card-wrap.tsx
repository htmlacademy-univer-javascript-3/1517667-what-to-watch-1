import { IFilmInfo } from "../../types/IFilmInfo";

type FilmCardWrapProps = {
  film: IFilmInfo;
  fromFilmPage: boolean;
  children: JSX.Element;
}

export function FilmCardWrap(props: FilmCardWrapProps) {
  const { film, fromFilmPage, children } = props;

  return (
    <div className={`film-card__wrap ${fromFilmPage && 'film-card__translate-top'}`}>
      <div className='film-card__info'>
        <div className={`film-card__poster ${fromFilmPage && 'film-card__poster--big'}`}>
          <img src={film.posterImage} alt={film.name} width='218' height='327' />
        </div>

        {children}
      </div>
    </div>
  );
}
