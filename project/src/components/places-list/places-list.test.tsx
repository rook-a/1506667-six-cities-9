import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';

import PlacesList from './places-list';

import { AuthorizationStatus, FetchStatus } from '../../utils/const';
import { mockOffer } from '../../utils/mock';

const history = createMemoryHistory();
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
        <HistoryRouter history={history}>
          <PlacesList offers={[mockOffer]} className={'tabs__content cities__places-list'} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
