import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MainContent from './main-content';

import { mockOffer } from '../../utils/mock';
import { AuthorizationStatus, FetchStatus } from '../../utils/const';

const mockStore = configureMockStore();
const store = mockStore({
  App: { city: 'Paris', sortType: 'Popular' },
  User: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  Favorites: { changeFavoriteStatus: FetchStatus.Idle },
});

describe('component: MainContent', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainContent offers={[mockOffer]} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/to stay in/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });
});
