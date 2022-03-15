import cn from 'classnames';

import Spinner from '../spinner/spinner';

import { useAppSelector } from '../../hooks';
import useLoginForm from '../../hooks/use-login-form';

import { FetchStatus } from '../../utils/const';

import styles from './login-form.module.css';

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

function LoginForm(): JSX.Element {
  const { loginStatus } = useAppSelector(({ USER }) => USER);

  const { formState, handleChange, handleSubmit } = useLoginForm();

  const isPending = loginStatus === FetchStatus.PENDING;
  const isValid = Object.values(formState).some(({ error }) => error);

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
          {isPending ? <Spinner className="loader--small" /> : 'Sign in'}
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
