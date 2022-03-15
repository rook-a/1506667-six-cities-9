import { createSlice } from '@reduxjs/toolkit';

import { fetchOfferAction, fetchOffersAction } from '../api-actions';

import { CITIES, FetchStatus, NameSpace, SortTypes } from '../../utils/const';

import { Review } from '../../types/review';
import { Offer } from '../../types/offer';

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
}

const initialState: InitialState = {
  city: CITIES[0],
  sortType: `${SortTypes.Popular}`,

  offers: [],
  offersError: false,
  offersStatus: FetchStatus.Idle,

  offer: null,
  offerStatus: FetchStatus.Idle,
  offerError: false,

  offersNearby: [],
  reviews: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    currentCity: (state, action) => {
      state.city = action.payload;
    },
    currentSortType: (state, action) => {
      state.sortType = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
    loadOffersNearby: (state, action) => {
      state.offersNearby = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersStatus = FetchStatus.Pending;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offersStatus = FetchStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersStatus = FetchStatus.Failed;
        state.offersError = true;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.offerStatus = FetchStatus.Pending;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offerStatus = FetchStatus.Success;
        state.offer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.offerStatus = FetchStatus.Failed;
        state.offerError = true;
      });
  },
});

export const { currentCity, currentSortType, loadReviews, loadOffersNearby } = dataProcess.actions;
