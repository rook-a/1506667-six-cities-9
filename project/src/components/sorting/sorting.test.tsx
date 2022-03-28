import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import Sorting from './sorting';
import { NameSpace } from '../../utils/const';

describe('component: Sorting', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore();

    render(
      <Provider store={mockStore()}>
        <Sorting sortingType={'Popular'} />
      </Provider>,
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });

  it('the sort list is expected to open', () => {
    const mockStore = configureMockStore();
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={mockStore()}>
        <Sorting sortingType={'Popular'} />
      </Provider>,
    );

    userEvent.click(screen.getByTestId('sorting'));
    expect(screen.getByRole('list').classList.contains('places__options--opened'));

    userEvent.click(screen.getByText('Top rated first'));
    expect(screen.getByTestId('Top rated first').classList.contains('places__option--active'));

    expect(useDispatch).toBeCalledTimes(3);
    expect(dispatch).nthCalledWith(1, {
      type: `${NameSpace.App}/currentSortType`,
      payload: 'Top rated first',
    });
  });

  it('should dispatch with the right action', () => {
    const mockStore = configureMockStore();
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={mockStore()}>
        <Sorting sortingType={'Popular'} />
      </Provider>,
    );

    userEvent.click(screen.getByText('Top rated first'));
    expect(screen.getByTestId('Top rated first').classList.contains('places__option--active'));

    expect(useDispatch).toBeCalledTimes(2);
    expect(dispatch).nthCalledWith(1, {
      type: `${NameSpace.App}/currentSortType`,
      payload: 'Top rated first',
    });
  });
});
