import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import EmptyFavorites from './empty-favorites';

const mockStore = configureMockStore();
const store = mockStore();

describe('component: EmptyFavorites', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <EmptyFavorites />
        </MemoryRouter>
      </Provider>,
    );

    const textElement = screen.getByText(/Nothing yet saved/i);
    const textElementDescription = screen.getByText(/Save properties to narrow down search or plan your future trips/i);

    expect(textElement).toBeInTheDocument();
    expect(textElementDescription).toBeInTheDocument();
  });
});
