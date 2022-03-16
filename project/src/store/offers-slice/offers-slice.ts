import { createSlice } from '@reduxjs/toolkit';

import { fetchFavoritesAction, fetchOfferAction, fetchOffersAction, fetchOffersNearbyAction } from '../api-actions';

import { FetchStatus, NameSpace } from '../../utils/const';

import { Offer } from '../../types/offer';
import { State } from '../../types/state';

interface InitialState {
  offers: Offer[];
  offersStatus: FetchStatus;
  offersError: boolean;

  offer: Offer | null;
  offerStatus: FetchStatus;
  offerError: boolean;

  offersNearby: Offer[] | undefined;
  offersNearbyStatus: FetchStatus;
  offersNearbyError: boolean;

  favoriteOffers: Offer[] | undefined;
  favoriteOffersStatus: FetchStatus;
  favoriteOffersError: boolean;
}

const initialState: InitialState = {
  offers: [],
  offersStatus: FetchStatus.Idle,
  offersError: false,

  offer: null,
  offerStatus: FetchStatus.Idle,
  offerError: false,

  offersNearby: [],
  offersNearbyStatus: FetchStatus.Idle,
  offersNearbyError: false,

  favoriteOffers: [],
  favoriteOffersStatus: FetchStatus.Idle,
  favoriteOffersError: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
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
      })
      .addCase(fetchOffersNearbyAction.pending, (state) => {
        state.offersNearbyStatus = FetchStatus.Pending;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearbyStatus = FetchStatus.Success;
        state.offersNearby = action.payload;
      })
      .addCase(fetchOffersNearbyAction.rejected, (state) => {
        state.offersNearbyStatus = FetchStatus.Failed;
        state.offersNearbyError = true;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.favoriteOffersStatus = FetchStatus.Pending;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoriteOffersStatus = FetchStatus.Success;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favoriteOffersStatus = FetchStatus.Failed;
        state.favoriteOffersError = true;
      });
  },
});

const selectOffersState = (state: State) => state[NameSpace.Offers];

export const selectOffers = (state: State) => selectOffersState(state).offers;
export const selectOffersStatus = (state: State) => selectOffersState(state).offersStatus;
export const selectOffer = (state: State) => selectOffersState(state).offer;
export const selectOfferStatus = (state: State) => selectOffersState(state).offerStatus;
export const selectoffersNearby = (state: State) => selectOffersState(state).offersNearby;
export const selectoffersNearbyStatus = (state: State) => selectOffersState(state).offersNearbyStatus;
export const selectFavoriteOffers = (state: State) => selectOffersState(state).favoriteOffers;
export const selectFavoriteOffersStatus = (state: State) => selectOffersState(state).favoriteOffersStatus;
