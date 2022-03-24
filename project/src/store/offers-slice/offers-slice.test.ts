import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import { offersSlice, fetchOffersAction, fetchOfferAction, fetchOffersNearbyAction } from './offers-slice';
import { createAPI } from '../../services/api';

import { APIRoute, FetchStatus } from '../../utils/const';
import { mockOffer } from '../../utils/mock';
import { State } from '../../types/state';

const mockOffers = Array.from({ length: 5 }, () => mockOffer);
const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

const state = {
  offers: [],
  offersStatus: FetchStatus.Idle,
  offersError: false,

  offer: null,
  offerStatus: FetchStatus.Idle,
  offerError: false,

  offersNearby: [],
  offersNearbyStatus: FetchStatus.Idle,
  offersNearbyError: false,
};

describe('offers slice', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  describe('offers async action', () => {
    it('should dispatch fetchOffersAction when GET /hotels', async () => {
      mockAPI.onGet(`${APIRoute.Offers}`).reply(200, mockOffers);

      const store = mockStore();

      await store.dispatch(fetchOffersAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchOffersAction.pending.type);
      expect(actions).toContain(fetchOffersAction.fulfilled.type);
      expect(actions).not.toContain(fetchOffersAction.rejected.type);
    });
  });

  describe('offer async action', () => {
    it('should dispatch fetchOfferAction when GET /hotels/id', async () => {
      const fakeOfferId = 1;

      mockAPI.onGet(`${APIRoute.Offers}/${fakeOfferId}`).reply(200, mockOffer);

      const store = mockStore();

      await store.dispatch(fetchOfferAction(fakeOfferId));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchOfferAction.pending.type);
      expect(actions).toContain(fetchOfferAction.fulfilled.type);
      expect(actions).not.toContain(fetchOfferAction.rejected.type);
    });
  });

  describe('offers nearby async action', () => {
    it('should dispatch fetchOffersNearbyAction when GET /hotels/id/nearby', async () => {
      const fakeOfferId = 1;

      mockAPI.onGet(`${APIRoute.Offers}/${fakeOfferId}/nearby`).reply(200, mockOffers);

      const store = mockStore();

      await store.dispatch(fetchOffersNearbyAction(fakeOfferId));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchOffersNearbyAction.pending.type);
      expect(actions).toContain(fetchOffersNearbyAction.fulfilled.type);
      expect(actions).not.toContain(fetchOffersNearbyAction.rejected.type);
    });
  });

  describe('fetch offers', () => {
    it('should be update offers, status and error to pending', () => {
      const action = {
        type: fetchOffersAction.pending.type,
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offers: [],
        offersStatus: FetchStatus.Pending,
        offersError: false,

        offer: null,
        offerStatus: FetchStatus.Idle,
        offerError: false,

        offersNearby: [],
        offersNearbyStatus: FetchStatus.Idle,
        offersNearbyError: false,
      });
    });

    it('should be update offers, status and error to fulfilled', () => {
      const action = {
        type: fetchOffersAction.fulfilled.type,
        payload: {
          mockOffers,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offers: action.payload,
        offersStatus: FetchStatus.Success,
        offersError: false,

        offer: null,
        offerStatus: FetchStatus.Idle,
        offerError: false,

        offersNearby: [],
        offersNearbyStatus: FetchStatus.Idle,
        offersNearbyError: false,
      });
    });

    it('should be update offers, status and error to rejected', () => {
      const action = {
        type: fetchOffersAction.rejected.type,
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offers: [],
        offersStatus: FetchStatus.Failed,
        offersError: true,

        offer: null,
        offerStatus: FetchStatus.Idle,
        offerError: false,

        offersNearby: [],
        offersNearbyStatus: FetchStatus.Idle,
        offersNearbyError: false,
      });
    });
  });

  describe('fetch offer', () => {
    it('should be update offer, status and error to pending', () => {
      const action = {
        type: fetchOfferAction.pending.type,
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offer: null,
        offerStatus: FetchStatus.Pending,
        offerError: false,

        offers: [],
        offersStatus: FetchStatus.Idle,
        offersError: false,

        offersNearby: [],
        offersNearbyStatus: FetchStatus.Idle,
        offersNearbyError: false,
      });
    });

    it('should be update offer status and error to fulfilled', () => {
      const action = {
        type: fetchOfferAction.fulfilled.type,
        payload: {
          mockOffer,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offer: action.payload,
        offerStatus: FetchStatus.Success,
        offerError: false,

        offers: [],
        offersStatus: FetchStatus.Idle,
        offersError: false,

        offersNearby: [],
        offersNearbyStatus: FetchStatus.Idle,
        offersNearbyError: false,
      });
    });

    it('should be update offer status and error to rejected', () => {
      const action = {
        type: fetchOfferAction.rejected.type,
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offer: null,
        offerStatus: FetchStatus.Failed,
        offerError: true,

        offers: [],
        offersStatus: FetchStatus.Idle,
        offersError: false,

        offersNearby: [],
        offersNearbyStatus: FetchStatus.Idle,
        offersNearbyError: false,
      });
    });
  });

  describe('fetch offers nearby', () => {
    it('should be update offers nearby, status and error to pending', () => {
      const action = {
        type: fetchOffersNearbyAction.pending.type,
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offersNearby: [],
        offersNearbyStatus: FetchStatus.Pending,
        offersNearbyError: false,

        offers: [],
        offersStatus: FetchStatus.Idle,
        offersError: false,

        offer: null,
        offerStatus: FetchStatus.Idle,
        offerError: false,
      });
    });

    it('should be update offers nearby, status and error to fulfilled', () => {
      const action = {
        type: fetchOffersNearbyAction.fulfilled.type,
        payload: {
          mockOffers,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offersNearby: action.payload,
        offersNearbyStatus: FetchStatus.Success,
        offersNearbyError: false,

        offers: [],
        offersStatus: FetchStatus.Idle,
        offersError: false,

        offer: null,
        offerStatus: FetchStatus.Idle,
        offerError: false,
      });
    });

    it('should be update offers nearby, status and error to rejected', () => {
      const action = {
        type: fetchOffersNearbyAction.rejected.type,
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offersNearby: [],
        offersNearbyStatus: FetchStatus.Failed,
        offersNearbyError: true,

        offers: [],
        offersStatus: FetchStatus.Idle,
        offersError: false,

        offer: null,
        offerStatus: FetchStatus.Idle,
        offerError: false,
      });
    });
  });
});
