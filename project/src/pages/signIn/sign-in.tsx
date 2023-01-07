import { Logo } from '../../components/logo/logo';
import { Footer } from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useRef, FormEvent } from 'react';
import { loginAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../components/private-route/private-route';
import { redirectToRoute } from '../../store/action';
import { getAuthorizationStatus, getAuthError } from '../../store/auth-process/selectors';
import { resetAuthError } from '../../store/auth-process/auth-process';
import { useState, useEffect } from 'react';

function HeaderSignIn() {
  return (
    <header className='page-header user-page__head'>
      <Logo isLight={false} />
      <h1 className='page-title user-page__title'>Sign in</h1>
    </header>
  );
}

export function SignIn() {

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch(); //sign-in__field--error

  if (authStatus === AuthorizationStatus.Auth) {
    dispatch(redirectToRoute('/'));
  }

  useEffect(() => {
    dispatch(resetAuthError());
  }, []);
  const authError = useAppSelector(getAuthError);

  const isEmailValid = () =>
    emailRef.current !== null && emailRef.current.value.length > 0 && emailRef.current.value.includes('@');

  const isPasswordValid = () => (
    passwordRef.current !== null &&
    passwordRef.current.value.length > 1 &&
    passwordRef.current.value.match(/(?=.*\d)(?=.*[A-Za-z])./g) !== null
  );

  const updateErrorMessageState = () => {
    if (!isEmailValid()) {
      setEmailError(true);
    } else if (!isPasswordValid()) {
      setEmailError(false);
      setPasswordError(true);
    } else {
      setEmailError(false);
      setPasswordError(false);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null && isEmailValid() && isPasswordValid()) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }));
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
          {authError &&
            <div className='sign-in__message'>
              <p>We can’t recognize this email <br /> and password combination. Please try again.</p>
            </div>}
          {(emailError || passwordError) &&
            <div className='sign-in__message'>
              <p>{emailError ? 'Please enter a valid email address' :
                'Please enter a valid password (with at least one letter and at least one number)'}
              </p>
            </div>}
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input
                ref={emailRef}
                className='sign-in__input'
                type='email'
                placeholder='Email address'
                name='user-email'
                id='user-email'
                data-testid='email'
                onBlur={updateErrorMessageState}
                required
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
                onBlur={updateErrorMessageState}
                required
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
