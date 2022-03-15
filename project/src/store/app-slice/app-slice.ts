import { createSlice } from '@reduxjs/toolkit';
import { CITIES, NameSpace, SortTypes } from '../../utils/const';

interface InitialState {
  city: string;
  sortType: string;
}

const initialState: InitialState = {
  city: CITIES[0],
  sortType: `${SortTypes.Popular}`,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    currentCity: (state, action) => {
      state.city = action.payload;
    },
    currentSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { currentCity, currentSortType } = appSlice.actions;
