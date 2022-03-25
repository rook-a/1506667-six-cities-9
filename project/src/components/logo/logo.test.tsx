import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import Logo from './logo';
import HistoryRouter from '../history-route/history-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

describe('component: Logo', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Logo isFooter={false} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTitle(/Six cities/i)).toBeInTheDocument();
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });
});
