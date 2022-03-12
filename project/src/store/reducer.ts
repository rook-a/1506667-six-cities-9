import { createReducer } from '@reduxjs/toolkit';
import { currentCity, currentSortType, loadOffersNearby, loadReviews, requireAuthorization } from './action';
import { CITIES, SortTypes, AuthorizationStatus, FetchStatus } from '../utils/const';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { fetchOfferAction, fetchOffersAction } from './api-actions';

interface InitialState {
  city: string;
  sortType: string;

  offers: Offer[];
  offersStatus: FetchStatus;
  offersError: boolean;

  offer: Offer | null;
  offerStatus: FetchStatus;
  offerError: boolean;

  offersNearby: Offer[];
  reviews: Review[];

  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  city: CITIES[0],
  sortType: `${SortTypes.POPULAR}`,

  offers: [],
  offersError: false,
  offersStatus: FetchStatus.IDLE,

  offer: null,
  offerStatus: FetchStatus.IDLE,
  offerError: false,

  offersNearby: [],
  reviews: [],

  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(currentCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(currentSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.offersStatus = FetchStatus.PENDING;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offersStatus = FetchStatus.SUCCESS;
      state.offers = action.payload;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.offersStatus = FetchStatus.FAILED;
      state.offersError = true;
    })
    .addCase(fetchOfferAction.pending, (state) => {
      state.offerStatus = FetchStatus.PENDING;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.offerStatus = FetchStatus.SUCCESS;
      state.offer = action.payload;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.offerStatus = FetchStatus.FAILED;
      state.offerError = true;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
