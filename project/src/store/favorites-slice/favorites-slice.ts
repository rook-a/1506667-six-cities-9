import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { api } from '../index';
import { handleError } from '../../services/handle-error';

import { Offer } from '../../types/offer';
import { APIRoute, FetchStatus, NameSpace } from '../../utils/const';
import { State } from '../../types/state';

interface InitialState {
  favoriteOffers: Offer[];
  favoriteOffersStatus: FetchStatus;
  favoriteOffersError: boolean;

  changeFavoriteStatus: FetchStatus;
}

const initialState: InitialState = {
  favoriteOffers: [],
  favoriteOffersStatus: FetchStatus.Idle,
  favoriteOffersError: false,

  changeFavoriteStatus: FetchStatus.Idle,
};

interface sendFavoriteStatus {
  id: number;
  status: number;
}

export const fetchFavoritesAction = createAsyncThunk('data/fetchFavorites', async () => {
  try {
    const { data } = await api.get<Offer[]>(`${APIRoute.Favorites}`);
    return data;
  } catch (err) {
    handleError(err);
    throw err;
  }
});

export const changeFavoriteStatus = createAsyncThunk(
  'data/changeFavoriteStatus',
  async ({ id, status }: sendFavoriteStatus) => {
    try {
      const { data } = await api.post<Offer>(`${APIRoute.Favorites}/${id}/${status}`);
      return data;
    } catch (err) {
      toast.error('Sorry, no luck processing the changes. Try again later');
      throw err;
    }
  },
);

export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
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
      })
      .addCase(changeFavoriteStatus.pending, (state) => {
        state.changeFavoriteStatus = FetchStatus.Pending;
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        state.changeFavoriteStatus = FetchStatus.Success;
        state.favoriteOffers = state.favoriteOffers.filter(({ id }) => id !== action.payload.id);
      })
      .addCase(changeFavoriteStatus.rejected, (state) => {
        state.changeFavoriteStatus = FetchStatus.Failed;
      });
  },
});

const selectFavoritesState = (state: State) => state[NameSpace.Favorites];

export const selectFavoriteOffers = (state: State) => selectFavoritesState(state).favoriteOffers;
export const selectFavoriteOffersStatus = (state: State) => selectFavoritesState(state).favoriteOffersStatus;
export const selectChangeFavoriteStatus = (state: State) => selectFavoritesState(state).changeFavoriteStatus;
