import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';

import Header from './header';

import { AuthorizationStatus } from '../../utils/const';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('component: Header', () => {
  it('should render correctly when user authorized', () => {
    const store = mockStore({
      User: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTitle(/Six cities/i)).toBeInTheDocument();
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();

    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('should render correctly when user not authorized', () => {
    const store = mockStore({
      User: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header isAuth />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTitle(/Six cities/i)).toBeInTheDocument();
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Favorites/i)).toBeInTheDocument();

    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });
});
