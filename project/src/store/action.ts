import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const currentCity = createAction<string>('main/changeCity');
export const currentSortType = createAction<string>('main/changeSortType');
export const fillPlacesList = createAction<Offer[]>('main/fillPlacesList');
