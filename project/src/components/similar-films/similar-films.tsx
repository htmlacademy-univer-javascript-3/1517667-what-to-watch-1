import { Footer } from '../../components/footer/footer';
import { FilmsList } from '../../components/films-list/films-list';
import { useAppSelector } from '../../hooks';
import { getSimilarFilms, areSimilarInLoading } from '../../store/film-data/selectors';


export function SimilarFilms() {
  const similarFilms = useAppSelector(getSimilarFilms).slice(0, 4);
  const areSimilarLoading = useAppSelector(areSimilarInLoading);

  if (areSimilarLoading) {
    return null;
  }

  return (
    <div className='page-content'>
      <section className='catalog catalog--like-this'>
        <h2 className='catalog__title'>More like this</h2>
        <FilmsList films={similarFilms} />
      </section>
      <Footer />
    </div>
  );
}