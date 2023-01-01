import { Logo } from '../../components/logo/logo';
import { UserBlock } from '../../components/user-block/user-block';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { IFilm } from '../../types/IFilmInfo';
import { AuthorizationStatus } from '../../components/private-route/private-route';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';

export function ReviewPageHeader({ film }: IFilm) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <header className='page-header'>
      <Logo isLight={false} />
      <nav className='breadcrumbs'>
        <ul className='breadcrumbs__list'>
          <li className='breadcrumbs__item'>
            <Link to={`/film/${film.id}`} className='breadcrumbs__link'>{film.name}</Link>
          </li>
          {authorizationStatus === AuthorizationStatus.Auth && (
            <li className='breadcrumbs__item'>
              <Link to={`/films/${film.id}/review`} className='breadcrumbs__link'>Add review</Link>
            </li>
          )}
        </ul>
      </nav>

      <UserBlock />
    </header>
  );
}
