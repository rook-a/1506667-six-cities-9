import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import LoginForm from './login-form';
import HistoryRouter from '../history-route/history-route';
import { AuthorizationStatus } from '../../utils/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  User: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
});

describe('component: LoginForm', () => {
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
});
