import { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';

import Spinner from '../spinner/spinner';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { loginAction } from '../../store/api-actions';

import { State } from '../../types/state';
import { FetchStatus } from '../../utils/const';

import styles from './login-form.module.css';

const REG_EXP_EMAIL = /^\S+@[aA-zZ]{2,10}\.[aA-zZ]{2,3}$/;
const REG_EXP_PASSWORD = /([0-9]{1}[aA-zZ]{1})|([aA-zZ]{1}[0-9]{1})/i;

const fields = {
  email: {
    label: 'Email',
    type: 'email',
  },
  password: {
    label: 'Password',
    type: 'password',
  },
};

interface LoginField {
  value: string;
  regexp: RegExp;
  error: boolean;
  errorText: string;
}

type InitialState = { [key: string]: LoginField };

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { loginStatus } = useAppSelector((state: State) => state);

  const [formState, setFormState] = useState<InitialState>({
    email: {
      value: '',
      regexp: REG_EXP_EMAIL,
      error: false,
      errorText: 'Email is not entered correctly',
    },
    password: {
      value: '',
      regexp: REG_EXP_PASSWORD,
      error: false,
      errorText: 'Enter at least 1 number and 1 letter',
    },
  });

  const isPending = loginStatus === FetchStatus.PENDING;
  const isValid = Object.values(formState).some(({ error }) => error === true);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;

    const regExp = formState[name].regexp;
    const isValid = regExp.test(value);

    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        error: !isValid,
        value,
      },
    }));
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const authData = { email: formState.email.value, password: formState.password.value };

    dispatch(loginAction(authData));
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
        {Object.entries(fields).map(([name, { label, type }]) => (
          <div className="login__input-wrapper form__input-wrapper" key={name}>
            <label className="visually-hidden">E-mail</label>
            <input
              onChange={handleChange}
              className={cn([styles['login__input']], 'form__input', {
                [styles['login__input--mb']]: formState[name].error,
              })}
              type={type}
              name={name}
              value={formState[name].value}
              placeholder={label}
              required
            />
            {formState[name].error && <p className={styles['login__error']}>{formState[name].errorText}</p>}
          </div>
        ))}

        <button className="login__submit form__submit button" type="submit" disabled={isValid || isPending}>
          {isPending ? <Spinner className={'loader--small'} /> : 'Sign in'}
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
