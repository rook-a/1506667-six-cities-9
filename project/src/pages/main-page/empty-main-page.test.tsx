import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import EmptyMainPage from './empty-main-page';

describe('component: EmptyMainPage', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore();

    render(
      <Provider store={mockStore({ App: { city: 'Paris' } })}>
        <EmptyMainPage />
      </Provider>,
    );

    const textElement = screen.getByText(/No places to stay available/i);
    const textElementDescription = screen.getByText(/We could not find any property available at the moment in/i);

    expect(textElement).toBeInTheDocument();
    expect(textElementDescription).toBeInTheDocument();
  });
});
