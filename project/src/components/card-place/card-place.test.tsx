import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import CardPlace from './card-place';

import { mockOffer } from '../../utils/mock';
import { AuthorizationStatus, FetchStatus } from '../../utils/const';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  User: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
  Favorites: { changeFavoriteStatus: FetchStatus.Idle },
});

describe('component: CardPlace', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardPlace offer={mockOffer} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('should call onCardHover function when user hover and unhover', () => {
    const handleCardHover = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardPlace offer={mockOffer} onCardHover={handleCardHover} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();

    userEvent.hover(screen.getByRole('article'));
    userEvent.unhover(screen.getByRole('article'));

    expect(handleCardHover).toBeCalledTimes(2);
  });
});
