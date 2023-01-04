import { Logo } from '../../components/logo/logo';
import { Footer } from '../../components/footer/footer';
import { useAppDispatch } from '../../hooks';
import { useRef, FormEvent } from 'react';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/AuthData';

function HeaderSignIn() {
  return (
    <header className='page-header user-page__head'>
      <Logo isLight={false} />
      <h1 className='page-title user-page__title'>Sign in</h1>
    </header>
  );
}

export function SignIn() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className='user-page'>
      <HeaderSignIn />
      <div className='sign-in user-page__content'>
        <form
          className='sign-in__form'
          action=""
          onSubmit={handleSubmit}
        >
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input
                ref={loginRef}
                className='sign-in__input'
                type='email'
                placeholder='Email address'
                name='user-email'
                id='user-email'
                data-testid='email'
              />
              <label className='sign-in__label visually-hidden' htmlFor='user-email'>Email address</label>
            </div>
            <div className='sign-in__field'>
              <input
                ref={passwordRef}
                className='sign-in__input'
                type='password'
                placeholder='Password'
                name='user-password'
                id='user-password'
                data-testid='password'
              />
              <label className='sign-in__label visually-hidden' htmlFor='user-password'>Password</label>
            </div>
          </div>
          <div className='sign-in__submit'>
            <button className='sign-in__btn'>Sign in</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
