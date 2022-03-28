import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';

import { redirect } from './redirect';
import { redirectToRoute } from '../action';

import { AppRoute } from '../../utils/const';
import { State } from '../../types/state';

const fakeHistory = {
  location: {
    pathname: '',
  },
  push(path: string) {
    this.location.pathname = path;
  },
};

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

jest.doMock('../../browser-history', () => fakeHistory);

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));

    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Login)]);
  });

  it('should not to be redirect /favorites because bad action', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: AppRoute.Favorites });

    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Favorites);
  });
});
