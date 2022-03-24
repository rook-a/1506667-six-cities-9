import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';

import HistoryRouter from '../../components/history-route/history-route';
import Property from './property';

import { AppRoute, AuthorizationStatus, FetchStatus } from '../../utils/const';
import { mockOffer, mockReview } from '../../utils/mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  User: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  Offers: { offers: [mockOffer], offer: mockOffer, offersNearby: [mockOffer] },
  Review: { reviews: [mockReview] },
  Favorites: { changeFavoriteStatus: FetchStatus.Idle },
});

describe('component: Property', () => {
  beforeEach(() => {
    history.push(AppRoute.Property);
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Property />
        </HistoryRouter>
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
