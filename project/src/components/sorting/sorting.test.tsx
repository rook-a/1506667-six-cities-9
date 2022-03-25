import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Sorting from './sorting';

describe('component: Sorting', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore();

    render(
      <Provider store={mockStore({})}>
        <Sorting sortingType={'Popular'} />
      </Provider>,
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });
});
