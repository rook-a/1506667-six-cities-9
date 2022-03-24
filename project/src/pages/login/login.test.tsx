import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import HistoryRouter from '../../components/history-route/history-route';
import Login from './login';

import { AppRoute, FetchStatus } from '../../utils/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  User: { loginStatus: FetchStatus.Idle },
});

describe('component: Login', () => {
  beforeEach(() => {
    history.push(AppRoute.Login);
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
});
