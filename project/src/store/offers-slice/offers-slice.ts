import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { APIRoute, FetchStatus, NameSpace } from '../../utils/const';

import { Offer } from '../../types/offer';
import { State } from '../../types/state';
import { selectCity, selectSortType } from '../app-slice/app-slice';
import { sortOffers } from '../../utils/utils';
import { handleError } from '../../services/handle-error';
import { api } from '../index';

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

export const fetchOffersAction = createAsyncThunk('data/fetchOffers', async () => {
  try {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  } catch (err) {
    handleError(err);
    throw err;
  }
});

export const fetchOfferAction = createAsyncThunk('data/fetchOffer', async (id: number) => {
  try {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  } catch (err) {
    handleError(err);
    throw err;
  }
});

export const fetchOffersNearbyAction = createAsyncThunk('data/fetchOffersNearby', async (id: number) => {
  try {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  } catch (err) {
    handleError(err);
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

export const selectCurrentOffers = createSelector(
  selectCity,
  selectSortType,
  selectOffers,
  (city, sortType, offers) => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    return sortOffers(sortType, filteredOffers);
  },
);
