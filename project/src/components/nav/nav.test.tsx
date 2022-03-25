import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import Nav from './nav';
import HistoryRouter from '../history-route/history-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

describe('component: Nav', () => {
  it('should render correctly when component NoAuth', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Nav />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correctly when component Auth', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Nav isAuth />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
