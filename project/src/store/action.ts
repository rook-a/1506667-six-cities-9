import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AuthorizationStatus } from '../utils/const';

export const currentCity = createAction<string>('main/changeCity');
export const currentSortType = createAction<string>('main/changeSortType');
export const fillPlacesList = createAction<Offer[]>('main/fillPlacesList');

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const loadOffer = createAction<Offer>('data/loadOffer');
export const loadReviews = createAction<Review[]>('data/loadReviews');
export const loadOffersNearby = createAction<Offer[]>('data/loadOffersNearby');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
