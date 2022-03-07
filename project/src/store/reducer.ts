import { createReducer } from '@reduxjs/toolkit';
import { currentCity, currentSortType, fillPlacesList } from './action';
import { offers } from '../mocks/offers';
import { reviews } from '../mocks/reviews';
import { CITIES, SortTypes } from '../utils/const';

const initialState = {
  city: CITIES[0],
  sortType: `${SortTypes.POPULAR}`,
  offers: offers,
  reviews: reviews,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(currentCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillPlacesList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(currentSortType, (state, action) => {
      state.sortType = action.payload;
    });
});
