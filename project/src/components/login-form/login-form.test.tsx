import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';

import LoginForm from './login-form';
import HistoryRouter from '../history-route/history-route';
import { AuthorizationStatus, FetchStatus } from '../../utils/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  User: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    loginStatus: FetchStatus.Idle,
  },
});

describe('component: LoginForm', () => {
  beforeEach(() => {
    history.push('/login');
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginForm />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('should enter correct login and password', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginForm />
        </HistoryRouter>
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
        <HistoryRouter history={history}>
          <LoginForm />
        </HistoryRouter>
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
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginForm />
        </HistoryRouter>
      </Provider>,
    );

    userEvent.type(screen.getByTestId(/email/i), 'test@mail.ru');
    userEvent.type(screen.getByTestId(/password/i), 'test1');
    userEvent.click(screen.getByRole('button'));

    expect(screen.getByDisplayValue(/test@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/test1/i)).toBeInTheDocument();
    expect(useDispatch).toBeCalledTimes(18);
  });
});
