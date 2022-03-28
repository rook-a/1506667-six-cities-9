import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Nav from './nav';

const mockStore = configureMockStore();
const store = mockStore();

describe('component: Nav', () => {
  it('should render correctly when component NoAuth', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correctly when component Auth', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Nav isAuth />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
