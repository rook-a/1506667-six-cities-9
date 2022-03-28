import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';

import LoginForm from './login-form';

import { AuthorizationStatus, FetchStatus } from '../../utils/const';

const mockStore = configureMockStore();
const store = mockStore({
  User: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    loginStatus: FetchStatus.Idle,
  },
});

describe('component: LoginForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('should enter correct login and password', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );

    userEvent.type(screen.getByTestId(/email/i), 'test@mail.ru');
    userEvent.type(screen.getByTestId(/password/i), 'test1');

    expect(screen.getByDisplayValue(/test@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/test1/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeEnabled();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should enter not correct login and password', () => {
    const store = mockStore({
      User: {
        loginStatus: FetchStatus.Pending,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );

    userEvent.type(screen.getByTestId(/email/i), 'test@.ru');
    userEvent.type(screen.getByTestId(/password/i), 'test');

    expect(screen.getByText(/Email is not entered correctly/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter at least 1 number and 1 letter/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).not.toBeEnabled();
  });

  it('should submit the login form', () => {
    const submitDispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(submitDispatch);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.submit(screen.getByRole('button'));

    expect(submitDispatch).toBeCalledTimes(1);
  });
});
