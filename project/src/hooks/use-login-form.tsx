import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from './index';
import { loginAction } from '../store/api-actions';

const REG_EXP_EMAIL = /^\S+@[aA-zZ]{2,10}\.[aA-zZ]{2,3}$/;
const REG_EXP_PASSWORD = /([0-9]{1}[aA-zZ]{1})|([aA-zZ]{1}[0-9]{1})/i;

interface LoginField {
  value: string;
  regexp: RegExp;
  error: boolean;
  errorText: string;
}

export type InitialState = { [key: string]: LoginField };

function useLoginForm() {
  const dispatch = useAppDispatch();
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

  const handleSubmit = (evt: FormEvent) => {
    if (evt) evt.preventDefault();
    const authData = { email: formState.email.value, password: formState.password.value };

    dispatch(loginAction(authData));
  };

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

  return {
    handleChange,
    handleSubmit,
    formState,
  };
}

export default useLoginForm;
