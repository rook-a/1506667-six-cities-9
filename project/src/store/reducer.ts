import { createReducer } from '@reduxjs/toolkit';
import {
  currentCity,
  currentSortType,
  fillPlacesList,
  loadOffer,
  loadOffers,
  loadOffersNearby,
  loadReviews,
  requireAuthorization,
} from './action';
import { CITIES, SortTypes, AuthorizationStatus } from '../utils/const';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

interface InitialState {
  city: string;
  sortType: string;
  offers: Offer[];
  offer: Offer | null;
  offersNearby: Offer[];
  reviews: Review[];
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
}

const initialState: InitialState = {
  city: CITIES[0],
  sortType: `${SortTypes.POPULAR}`,
  offers: [],
  offer: null,
  offersNearby: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(currentCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillPlacesList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(currentSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
