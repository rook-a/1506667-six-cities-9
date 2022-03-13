import { createReducer } from '@reduxjs/toolkit';

import { removeUser, setUser } from '../services/user';

import { currentCity, currentSortType, loadOffersNearby, loadReviews, requireAuthorization } from './action';
import { fetchOfferAction, fetchOffersAction, loginAction, logoutAction } from './api-actions';

import { CITIES, SortTypes, AuthorizationStatus, FetchStatus } from '../utils/const';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

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
  loginStatus: FetchStatus;
  logoutStatus: FetchStatus;
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
  loginStatus: FetchStatus.IDLE,
  logoutStatus: FetchStatus.IDLE,
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
    })
    .addCase(loginAction.pending, (state) => {
      state.loginStatus = FetchStatus.PENDING;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.loginStatus = FetchStatus.SUCCESS;
      state.authorizationStatus = AuthorizationStatus.AUTH;
      setUser(action.payload);
    })
    .addCase(loginAction.rejected, (state) => {
      state.loginStatus = FetchStatus.FAILED;
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    })
    .addCase(logoutAction.pending, (state) => {
      state.logoutStatus = FetchStatus.PENDING;
    })
    .addCase(logoutAction.fulfilled, (state, action) => {
      state.logoutStatus = FetchStatus.SUCCESS;
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      removeUser();
    })
    .addCase(logoutAction.rejected, (state) => {
      state.logoutStatus = FetchStatus.FAILED;
      state.authorizationStatus = AuthorizationStatus.AUTH;
    });
});
