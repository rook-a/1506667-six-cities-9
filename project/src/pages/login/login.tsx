import { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';

import { useAppDispatch } from '../../hooks/index';
import { loginAction } from '../../store/api-actions';

import Header from '../../components/header/header';

import { AuthData } from '../../types/auth-data';

import styles from './login.module.css';

const regExpEmail = new RegExp(/^\S+@[A-Za-z]{2,10}\.[A-Za-z]{2,3}$/);
const regExpPassword = new RegExp(/[A-Za-zА-Яа-я]{1}[0-9]{1}/);

function Login(): JSX.Element {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    email: '',
    emailError: false,
    emailErrorText: 'Email is not entered correctly',
    password: '',
    passwordError: false,
    passwordErrorText: 'Enter at least 1 number and 1 letter',
  });

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (regExpEmail.test(value)) {
      return setForm({ ...form, email: value, emailError: false });
    }

    return setForm({ ...form, email: value, emailError: true });
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (regExpPassword.test(value)) {
      return setForm({ ...form, password: value, passwordError: false });
    }

    return setForm({ ...form, password: value, passwordError: true });
  };

  const handleFormSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  return (
    <div className="page page--gray page--login">
      <Header isLogged />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={(evt: FormEvent<HTMLFormElement>) => {
                evt.preventDefault();
                handleFormSubmit({ email: form.email, password: form.password });
              }}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  onChange={(evt) => handleEmailChange(evt)}
                  className={cn('login__input', 'form__input', { [styles['login__input--mb']]: form.emailError })}
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Email"
                  required
                />
                {form.emailError && <p className={styles['login__error']}>{form.emailErrorText}</p>}
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  onChange={(evt) => handlePasswordChange(evt)}
                  className={cn('login__input', 'form__input', { [styles['login__input--mb']]: form.passwordError })}
                  type="password"
                  name="password"
                  value={form.password}
                  placeholder="Password"
                  required
                />
                {form.passwordError && <p className={styles['login__error']}>{form.passwordErrorText}</p>}
              </div>

              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={form.emailError || form.passwordError}>
                Sign in
              </button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
