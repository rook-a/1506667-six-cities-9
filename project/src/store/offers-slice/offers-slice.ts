import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import Rollbar from 'rollbar';

import { handleError } from '../../services/handle-error';
import { changeFavoriteStatus } from '../favorites-slice/favorites-slice';
import { selectCity, selectSortType } from '../app-slice/app-slice';

import { sortOffers } from '../../utils/utils';
import { APIRoute, FetchStatus, NameSpace, rollbarConfig } from '../../utils/const';
import { Offer } from '../../types/offer';
import { AppDispatch, State } from '../../types/state';

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
};

const rollbar = new Rollbar(rollbarConfig);

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  } catch (err) {
    handleError(err);
    rollbar.error(err);
    throw err;
  }
});

export const fetchOfferAction = createAsyncThunk<
  Offer,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffer', async (id: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  } catch (err) {
    handleError(err);
    rollbar.error(err);
    throw err;
  }
});

export const fetchOffersNearbyAction = createAsyncThunk<
  Offer[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffersNearby', async (id: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  } catch (err) {
    handleError(err);
    rollbar.error(err);
    throw err;
  }
});

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
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        const index = state.offers.findIndex(({ id }) => id === action.payload.id);
        state.offers[index] = action.payload;
        state.offer = state.offer !== null ? action.payload : null;
      });
  },
});

const selectOffersState = (state: State) => state[NameSpace.Offers];

export const selectOffers = (state: State) => selectOffersState(state).offers;
export const selectOffer = (state: State) => selectOffersState(state).offer;
export const selectOfferStatus = (state: State) => selectOffersState(state).offerStatus;
export const selectOffersNearby = (state: State) => selectOffersState(state).offersNearby;
export const selectOffersNearbyStatus = (state: State) => selectOffersState(state).offersNearbyStatus;

export const selectCurrentOffers = createSelector(
  selectCity,
  selectSortType,
  selectOffers,
  (city, sortType, offers) => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    return sortOffers(sortType, filteredOffers);
  },
);
