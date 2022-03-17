import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../utils/const';
import { offersSlice } from './offers-slice/offers-slice';
import { userSlice } from './user-slice/user-slice';
import { appSlice } from './app-slice/app-slice';
import { reviewSlice } from './review-slice/review-slice';

export const rootReducer = combineReducers({
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Review]: reviewSlice.reducer,
});
