import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import HistoryRouter from '../history-route/history-route';
import PrivateOutlet from './private-outlet';

import { AppRoute, AuthorizationStatus } from '../../utils/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('component: PrivateOutlet', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<h1>Public Route</h1>} />
            <Route path="/private" element={<PrivateOutlet authorizationStatus={AuthorizationStatus.NoAuth} />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<h1>Public Route</h1>} />
            <Route element={<PrivateOutlet authorizationStatus={AuthorizationStatus.Auth} />}>
              <Route path="/private" element={<h1>Private Route</h1>} />
            </Route>
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
