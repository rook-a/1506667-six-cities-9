import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import PlacesList from './places-list';

import { AuthorizationStatus, FetchStatus } from '../../utils/const';
import { mockOffer } from '../../utils/mock';

const mockStore = configureMockStore();
const store = mockStore({
  User: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  Favorites: { changeFavoriteStatus: FetchStatus.Idle },
});

describe('component: PlacesList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesList offers={[mockOffer]} className={'tabs__content cities__places-list'} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
