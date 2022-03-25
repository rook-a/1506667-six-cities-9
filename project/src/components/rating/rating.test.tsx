import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Rating from './rating';

describe('component: Rating', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore();
    const onRatingChange = jest.fn();

    render(
      <Provider store={mockStore({})}>
        <Rating onFormDisabled={false} onRatingChange={onRatingChange} currentRating={3} />
      </Provider>,
    );

    expect(screen.getByTitle(/perfect/i)).toBeInTheDocument();
    expect(screen.getByTitle(/good/i)).toBeInTheDocument();
    expect(screen.getByTitle(/not bad/i)).toBeInTheDocument();
    expect(screen.getByTitle(/badly/i)).toBeInTheDocument();
    expect(screen.getByTitle(/terribly/i)).toBeInTheDocument();
  });
});
