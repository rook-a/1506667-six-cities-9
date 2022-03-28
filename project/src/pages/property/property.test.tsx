import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Property from './property';

import { AuthorizationStatus, FetchStatus } from '../../utils/const';
import { mockOffer, mockReview } from '../../utils/mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  User: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  Offers: { offers: [mockOffer], offer: mockOffer, offersNearby: [mockOffer] },
  Review: { reviews: [mockReview] },
  Favorites: { changeFavoriteStatus: FetchStatus.Idle },
});

describe('component: Property', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/12345']}>
          <Property />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
