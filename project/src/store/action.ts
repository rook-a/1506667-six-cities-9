import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const currentCity = createAction<string>('main/changeCity');
export const fillPlacesList = createAction<Offer[]>('main/fillPlacesList');
