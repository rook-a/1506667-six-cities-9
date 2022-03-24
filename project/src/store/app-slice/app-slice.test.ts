import { appSlice, currentCity, currentSortType } from './app-slice';
import { SortTypes, CITIES } from '../../utils/const';

const state = {
  city: CITIES[0],
  sortType: `${SortTypes.Popular}`,
};

describe('App slice', () => {
  it('the current city should be updated correctly', () => {
    expect(appSlice.reducer(state, currentCity(CITIES[1]))).toEqual({
      city: CITIES[1],
      sortType: `${SortTypes.Popular}`,
    });
  });

  it('the current city must be updated incorrectly', () => {
    expect(appSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  it('the current sorting type should be updated correctly', () => {
    expect(appSlice.reducer(state, currentSortType(SortTypes.PriceHigh))).toEqual({
      city: CITIES[0],
      sortType: `${SortTypes.PriceHigh}`,
    });
  });

  it('the current sorting type should be updated incorrectly', () => {
    expect(appSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });
});
