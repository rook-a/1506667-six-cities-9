import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import MainContent from './main-content';
import { mockOffer } from '../../utils/mock';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { AuthorizationStatus, FetchStatus } from '../../utils/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
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
        <HistoryRouter history={history}>
          <MainContent offers={[mockOffer]} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/to stay in/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });
});
