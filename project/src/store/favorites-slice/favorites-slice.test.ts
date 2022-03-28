import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import { favoritesSlice, changeFavoriteStatus, fetchFavoritesAction } from './favorites-slice';
import { createAPI } from '../../services/api';

import { APIRoute, FetchStatus } from '../../utils/const';
import { mockOffer } from '../../utils/mock';
import { State } from '../../types/state';
import { sendFavoriteStatus } from '../../types/send-favorite-status';

const mockOffers = Array.from({ length: 5 }, () => mockOffer);

const state = {
  favoriteOffers: [],
  favoriteOffersStatus: FetchStatus.Idle,
  favoriteOffersError: false,

  changeFavoriteStatus: FetchStatus.Idle,
};

describe('favorites slice', () => {
  it('without additional parameters should return initial state', () => {
    expect(favoritesSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  describe('favorites async action', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];

    const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

    it('should dispatch fetchFavoritesAction when GET /favorites', async () => {
      mockAPI.onGet(`${APIRoute.Favorites}`).reply(200, mockOffers);

      const store = mockStore();

      await store.dispatch(fetchFavoritesAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchFavoritesAction.pending.type);
      expect(actions).toContain(fetchFavoritesAction.fulfilled.type);
      expect(actions).not.toContain(fetchFavoritesAction.rejected.type);
    });

    it('should dispatch changeFavoriteStatus when POST /favorites/id/status', async () => {
      const fakeChangeStatus: sendFavoriteStatus = { id: 1, status: 1 };

      mockAPI.onPost(`${APIRoute.Favorites}/${1}/${1}`).reply(200, mockOffer);

      const store = mockStore();

      await store.dispatch(changeFavoriteStatus(fakeChangeStatus));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(changeFavoriteStatus.pending.type);
      expect(actions).toContain(changeFavoriteStatus.fulfilled.type);
      expect(actions).not.toContain(changeFavoriteStatus.rejected.type);
    });
  });

  describe('fetch favorites', () => {
    it('should be update favorites, status and error to pending', () => {
      const action = {
        type: fetchFavoritesAction.pending.type,
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        favoriteOffers: [],
        favoriteOffersStatus: FetchStatus.Pending,
        favoriteOffersError: false,

        changeFavoriteStatus: FetchStatus.Idle,
      });
    });

    it('should be update favorites, status and error to fulfilled', () => {
      const action = {
        type: fetchFavoritesAction.fulfilled.type,
        payload: {
          mockOffers,
        },
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        favoriteOffers: action.payload,
        favoriteOffersStatus: FetchStatus.Success,
        favoriteOffersError: false,

        changeFavoriteStatus: FetchStatus.Idle,
      });
    });

    it('should be update favorites, status and error to rejected', () => {
      const action = {
        type: fetchFavoritesAction.rejected.type,
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        favoriteOffers: [],
        favoriteOffersStatus: FetchStatus.Failed,
        favoriteOffersError: true,

        changeFavoriteStatus: FetchStatus.Idle,
      });
    });
  });

  describe('change favorites status', () => {
    it('should be cange favorite status to pending', () => {
      const action = {
        type: changeFavoriteStatus.pending.type,
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        changeFavoriteStatus: FetchStatus.Pending,

        favoriteOffers: [],
        favoriteOffersStatus: FetchStatus.Idle,
        favoriteOffersError: false,
      });
    });

    it('should be cange favorite status to fulfilled', () => {
      const action = {
        type: changeFavoriteStatus.fulfilled.type,
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        changeFavoriteStatus: FetchStatus.Success,

        favoriteOffers: [],
        favoriteOffersStatus: FetchStatus.Idle,
        favoriteOffersError: false,
      });
    });

    it('should be cange favorite status to rejected', () => {
      const action = {
        type: changeFavoriteStatus.rejected.type,
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        changeFavoriteStatus: FetchStatus.Failed,

        favoriteOffers: [],
        favoriteOffersStatus: FetchStatus.Idle,
        favoriteOffersError: false,
      });
    });
  });
});
