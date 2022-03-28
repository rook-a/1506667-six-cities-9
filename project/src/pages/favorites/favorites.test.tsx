import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Favorites from './favorites';

import { AuthorizationStatus } from '../../utils/const';
import { mockOffer } from '../../utils/mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  User: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  Favorites: { favoriteOffers: [mockOffer] },
});

describe('component: Favorites', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
