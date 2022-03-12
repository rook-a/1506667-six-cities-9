import { createAsyncThunk } from '@reduxjs/toolkit';

import { api, store } from '../store/index';
import { loadOffersNearby, loadReviews, requireAuthorization, redirectToRoute } from './action';
import { setToken, removeToken } from '../services/token';
import { handleError } from '../services/handle-error';

import { APIRoute, AuthorizationStatus, AppRoute } from '../utils/const';

import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';

export const fetchOffersAction = createAsyncThunk('data/fetchOffers', async () => {
  try {
    const { data } = await api.get<Offer[]>(APIRoute.OFFERS);
    return data;
  } catch (err) {
    handleError(err);
    throw err;
  }
});

export const fetchOfferAction = createAsyncThunk('data/fetchOffer', async (id: number) => {
  try {
    const { data } = await api.get<Offer>(`${APIRoute.OFFERS}/${id}`);
    return data;
  } catch (err) {
    handleError(err);
    throw err;
  }
});

export const fetchOffersNearbyAction = createAsyncThunk('data/fetchOffersNearby', async (id: number) => {
  try {
    const { data } = await api.get<Offer[]>(`${APIRoute.OFFERS}/${id}/nearby`);
    store.dispatch(loadOffersNearby(data));
  } catch (err) {
    handleError(err);
  }
});

export const fetchReviewsAction = createAsyncThunk('data/fetchReviews', async (id: number) => {
  try {
    const { data } = await api.get<Review[]>(`${APIRoute.COMMENTS}/${id}`);
    store.dispatch(loadReviews(data));
  } catch (err) {
    handleError(err);
  }
});

export const fetchFavoritesAction = createAsyncThunk('data/fetchFavorites', async () => {
  try {
    const { data } = await api.get<Offer[]>(`${APIRoute.FAVORITES}`);
    return data;
  } catch (err) {
    handleError(err);
  }
});

export const checkAuthAction = createAsyncThunk('user/checkAuth', async () => {
  try {
    await api.get(APIRoute.LOGIN);
    store.dispatch(requireAuthorization(AuthorizationStatus.AUTH));
  } catch (err) {
    handleError(err);
    store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
  }
});

export const loginAction = createAsyncThunk('user/login', async ({ email, password }: AuthData) => {
  try {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.LOGIN, { email, password });
    setToken(token);
    store.dispatch(requireAuthorization(AuthorizationStatus.AUTH));
    store.dispatch(redirectToRoute(AppRoute.MAIN));
  } catch (err) {
    handleError(err);
    store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
  }
});

export const logoutAction = createAsyncThunk('user/logout', async () => {
  try {
    await api.delete(APIRoute.LOGOUT);
    removeToken();
    store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
  } catch (err) {
    handleError(err);
  }
});
