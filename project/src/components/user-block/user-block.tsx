import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AuthorizationStatus } from '../private-route/private-route';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';

export function UserBlock() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className='user-block'>
        <li className='user-block__item'>
          <div className='user-block__avatar'>
            <Link to='/mylist' data-testid='favorites'>
              <img src='img/avatar.jpg' alt='User avatar' width='63' height='63' />
            </Link>
          </div>
        </li>
        <li className='user-block__item'>
          <Link
            className='user-block__link'
            to='/'
            onClick={(e) => {
              e.preventDefault();
              dispatch(logoutAction());
            }}
          >
            Sign out
          </Link>
        </li>
      </ul>
    );
  } else {
    return (
      <div className='user-block'>
        <Link className='user-block__link' to='/login'>Sign in</Link>
      </div>
    );
  }
}
