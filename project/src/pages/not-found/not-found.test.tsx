import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import NotFound from './not-found';

describe('component: NotFound', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore();

    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
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
