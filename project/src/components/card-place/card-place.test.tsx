import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';

import CardPlace from './card-place';

import { mockOffer } from '../../utils/mock';
import { AuthorizationStatus, FetchStatus } from '../../utils/const';

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
        <MemoryRouter>
          <CardPlace offer={mockOffer} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('should call onCardHover function and change state id when user hover and unhover', () => {
    const mockState: { id: number | null } = {
      id: null,
    };

    const handleCardHover = (id: number | null) => {
      mockState.id = id;
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardPlace offer={mockOffer} onCardHover={handleCardHover} />
        </MemoryRouter>
      </Provider>,
    );

    const card = screen.getByRole('article');

    userEvent.hover(card);
    expect(mockState).toHaveProperty('id', 12345);

    userEvent.unhover(card);
    expect(mockState).toHaveProperty('id', null);
  });
});
