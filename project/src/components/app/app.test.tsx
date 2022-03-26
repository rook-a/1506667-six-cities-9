import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';

import HistoryRouter from '../history-route/history-route';
import App from './app';

import { mockOffer, mockReview } from '../../utils/mock';
import { AuthorizationStatus, AppRoute } from '../../utils/const';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  App: { sortType: 'Popular' },
  User: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  Offers: { offers: [mockOffer], offer: mockOffer },
  Review: { reviews: [mockReview] },
  Favorites: { favoriteOffers: [mockOffer] },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App routing', () => {
  it('should render MainPage when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in/i)).toBeInTheDocument();
  });

  it('should render Login page when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('should render Favorites when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render Property when user navigate to "/offer/id"', () => {
    history.push(`${AppRoute.Property}/1`);

    render(fakeApp);

    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render NotFound when user navigate to unknown route', () => {
    history.push('/unknown');

    render(fakeApp);

    expect(screen.getByText(/That page can't be found/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to main page/i)).toBeInTheDocument();
    expect(screen.getByText(/Go back/i)).toBeInTheDocument();
  });
});
