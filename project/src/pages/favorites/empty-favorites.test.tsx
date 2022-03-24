import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import HistoryRouter from '../../components/history-route/history-route';
import EmptyFavorites from './empty-favorites';

import { AppRoute } from '../../utils/const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({});

describe('component: EmptyFavorites', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <EmptyFavorites />
        </HistoryRouter>
      </Provider>,
    );

    const textElement = screen.getByText(/Nothing yet saved/i);
    const textElementDescription = screen.getByText(/Save properties to narrow down search or plan your future trips/i);

    expect(textElement).toBeInTheDocument();
    expect(textElementDescription).toBeInTheDocument();
  });
});
