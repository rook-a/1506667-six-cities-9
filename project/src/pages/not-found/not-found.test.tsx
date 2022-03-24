import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import NotFound from './not-found';

describe('component: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const mockStore = configureMockStore();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <NotFound />
        </HistoryRouter>
      </Provider>,
    );

    const text = screen.getByText("That page can't be found");
    const buttonGoMain = screen.getByText('Back to main page');
    const buttonGoBack = screen.getByText('Go back');

    expect(text).toBeInTheDocument();
    expect(buttonGoMain).toBeInTheDocument();
    expect(buttonGoBack).toBeInTheDocument();
  });
});
