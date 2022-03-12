import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AppRoute, AuthorizationStatus } from '../utils/const';

export const currentCity = createAction<string>('main/changeCity');
export const currentSortType = createAction<string>('main/changeSortType');
export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');

export const loadReviews = createAction<Review[]>('data/loadReviews');
export const loadOffersNearby = createAction<Offer[]>('data/loadOffersNearby');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
