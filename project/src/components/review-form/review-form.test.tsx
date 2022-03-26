import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import ReviewsForm from './review-form';
import HistoryRouter from '../history-route/history-route';
import { AuthorizationStatus, FetchStatus } from '../../utils/const';

const mockNotValidComment = 'Lorem ipsum dolor sit amet, consectetuer';
const mockValidComment = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  User: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
  Review: { sendReviewStatus: FetchStatus.Idle },
});

describe('component: ReviewsForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsForm offerId={1} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId('rating')).toHaveLength(5);
    expect(
      screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i));
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should enter comment 60 signs', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsForm offerId={1} />
        </HistoryRouter>
      </Provider>,
    );

    const ratingInput = screen.getAllByTestId('rating')[0];

    userEvent.click(ratingInput);
    userEvent.type(screen.getByRole('textbox'), mockValidComment);

    expect(screen.getByRole('button')).toBeEnabled();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should enter comment 40 signs', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsForm offerId={1} />
        </HistoryRouter>
      </Provider>,
    );

    const ratingInput = screen.getAllByTestId('rating')[0];

    userEvent.click(ratingInput);

    userEvent.type(screen.getByRole('textbox'), mockNotValidComment);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).not.toBeEnabled();
  });
});
