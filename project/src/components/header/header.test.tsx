import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import Header from './header';

import { AuthorizationStatus } from '../../utils/const';

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
        <MemoryRouter>
          <Header />
        </MemoryRouter>
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
        <MemoryRouter>
          <Header isAuth />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTitle(/Six cities/i)).toBeInTheDocument();
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Favorites/i)).toBeInTheDocument();

    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });
});
