import { render, screen } from '@testing-library/react';

import Rating from './rating';

import { RATING } from '../../utils/const';

describe('component: Rating', () => {
  it('should render correctly', () => {
    const onRatingChange = jest.fn();

    render(<Rating onFormDisabled={false} onRatingChange={onRatingChange} currentRating={3} />);

    expect(screen.getAllByTestId('rating')).toHaveLength(RATING.length);
  });
});
