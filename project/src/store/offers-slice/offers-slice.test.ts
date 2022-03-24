import { offersSlice, fetchOffersAction, fetchOfferAction, fetchOffersNearbyAction } from "./offers-slice";
import { mockOffer } from "../../utils/mock";
import { FetchStatus } from "../../utils/const";

const mockOffers = Array.from({length: 5}, () => mockOffer);

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
}

describe('offers slice', () => {

  it('without additional parameters should return initial state', () => {
    expect(offersSlice.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(state);
  });

  describe('fetch offers', () => {

    it('should be update offers, status and error to pending', () => {
      const action = {
        type: fetchOffersAction.pending.type,
        payload: {
          offers: [],
          offersStatus: FetchStatus.Idle,
          offersError: false,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offers: [],
        offersStatus: FetchStatus.Pending,
        offersError: false,
      });
    });

    it('should be update offers, status and error to fulfilled', () => {
      //добавить ассинхронщину

      const action = {
        type: fetchOffersAction.fulfilled.type,
        payload: {
          offers: [],
          offersStatus: FetchStatus.Pending,
          offersError: false,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offers: mockOffers,
        offersStatus: FetchStatus.Success,
        offersError: false,
      });
    });

    it('should be update offers, status and error to rejected', () => {
      const action = {
        type: fetchOffersAction.rejected.type,
        payload: {
          offers: [],
          offersStatus: FetchStatus.Pending,
          offersError: false,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offers: [],
        offersStatus: FetchStatus.Failed,
        offersError: true,
      });
    });
  });

  describe('fetch offer', () => {
    it('should be update offer, status and error to pending', () => {
      const action = {
        type: fetchOfferAction.pending.type,
        payload: {
          offer: null,
          offerStatus: FetchStatus.Idle,
          offerError: false,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offer: null,
        offerStatus: FetchStatus.Pending,
        offerError: false,
      });
    });

    it('should be update offer status and error to fulfilled', () => {
      //добавить ассинхронщину

      const action = {
        type: fetchOfferAction.fulfilled.type,
        payload: {
          offer: null,
          offerStatus: FetchStatus.Pending,
          offerError: false,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offer: mockOffer,
        offerStatus: FetchStatus.Success,
        offerError: false,
      });
    });

    it('should be update offer status and error to rejected', () => {
      const action = {
        type: fetchOfferAction.rejected.type,
        payload: {
          offer: null,
          offerStatus: FetchStatus.Pending,
          offerError: false,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offer: null,
        offerStatus: FetchStatus.Failed,
        offerError: true,
      });
    });
  });

  describe('fetch offers nearby', () => {
    it('should be update offers nearby, status and error to pending', () => {
      const action = {
        type: fetchOffersNearbyAction.pending.type,
        payload: {
          offersNearby: [],
          offersNearbyStatus: FetchStatus.Idle,
          offersNearbyError: false,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offersNearby: [],
        offersNearbyStatus: FetchStatus.Pending,
        offersNearbyError: false,
      });
    });

    it('should be update offers nearby, status and error to fulfilled', () => {
      //добавить ассинхронщину

      const action = {
        type: fetchOffersNearbyAction.fulfilled.type,
        payload: {
          offersNearby: [],
          offersNearbyStatus: FetchStatus.Pending,
          offersNearbyError: false,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offersNearby: mockOffers,
        offersNearbyStatus: FetchStatus.Success,
        offersNearbyError: false,
      });
    });

    it('should be update offers nearby, status and error to rejected', () => {
      const action = {
        type: fetchOffersNearbyAction.rejected.type,
        payload: {
          offersNearby: [],
          offersNearbyStatus: FetchStatus.Pending,
          offersNearbyError: false,
        },
      };

      expect(offersSlice.reducer(state, action)).toEqual({
        offersNearby: [],
        offersNearbyStatus: FetchStatus.Failed,
        offersNearbyError: true,
      });
    });
  });
});
