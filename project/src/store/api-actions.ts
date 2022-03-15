import { createAsyncThunk } from '@reduxjs/toolkit';

import { api, store } from '../store/index';
import { requireAuthorization } from './user-slice/user-slice';

import { handleError } from '../services/handle-error';

import { APIRoute, AuthorizationStatus } from '../utils/const';

import { Offer } from '../types/offer';
import { Review } from '../types/review';

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

export const fetchReviewsAction = createAsyncThunk('data/fetchReviews', async (id: number) => {
  try {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    return data;
  } catch (err) {
    handleError(err);
    throw err;
  }
});

export const fetchFavoritesAction = createAsyncThunk('data/fetchFavorites', async () => {
  try {
    const { data } = await api.get<Offer[]>(`${APIRoute.Favorites}`);
    return data;
  } catch (err) {
    handleError(err);
  }
});

export const checkAuthAction = createAsyncThunk('user/checkAuth', async () => {
  try {
    await api.get(APIRoute.Login);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch (err) {
    handleError(err);
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});
