import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Bookmark from './boormark';
import { AuthorizationStatus, FetchStatus } from '../../utils/const';

const mockStore = configureMockStore();
const store = mockStore({
  User: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
  Favorites: { changeFavoriteStatus: FetchStatus.Idle },
});

describe('component: Bookmark', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Bookmark id={1} isSmall className={'cities__place-card'} isFavorite={false} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('should bookmark button disabled when changeFavoriteStatus: pending ', () => {
    const store = mockStore({
      User: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      Favorites: { changeFavoriteStatus: FetchStatus.Pending },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Bookmark id={1} isSmall className={'cities__place-card'} isFavorite />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should click and /login dispatch when user not authrized', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Bookmark id={1} isSmall className={'cities__place-card'} isFavorite={false} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button').classList.contains('place-card__bookmark-button--active'));

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: `main/redirectToRoute`,
      payload: '/login',
    });
  });

  it('waiting for the correct action to be dispatch when bookmark clicked', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      User: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      Favorites: { changeFavoriteStatus: FetchStatus.Idle },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Bookmark id={1} isSmall className={'cities__place-card'} isFavorite={false} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button').classList.contains('place-card__bookmark-button--active'));

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(1);
  });
});
