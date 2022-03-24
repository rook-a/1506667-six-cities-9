import { favoritesSlice, changeFavoriteStatus, fetchFavoritesAction } from "./favorites-slice";
import { mockOffer } from "../../utils/mock";
import { FetchStatus } from "../../utils/const";

const mockOffers = Array.from({length: 5}, () => mockOffer);

const state = {
  favoriteOffers: [],
  favoriteOffersStatus: FetchStatus.Idle,
  favoriteOffersError: false,

  changeFavoriteStatus: FetchStatus.Idle,
};

describe('favorites slice', () => {

  it('without additional parameters should return initial state', () => {
    expect(favoritesSlice.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(state);
  });

  describe('fetch favorites', () => {
    it('should be update favorites, status and error to pending', () => {
      const action = {
        type: fetchFavoritesAction.pending.type,
        payload: {
          favoriteOffers: [],
          favoriteOffersStatus: FetchStatus.Idle,
          favoriteOffersError: false,
        },
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        favoriteOffers: [],
        favoriteOffersStatus: FetchStatus.Pending,
        favoriteOffersError: false,
      });
    });

    it('should be update favorites, status and error to fulfilled', () => {
      //добавить ассинхронщину

      const action = {
        type: fetchFavoritesAction.fulfilled.type,
        payload: {
          favoriteOffers: [],
          favoriteOffersStatus: FetchStatus.Pending,
          favoriteOffersError: false,
        },
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        favoriteOffers: mockOffers,
        favoriteOffersStatus: FetchStatus.Success,
        favoriteOffersError: false,
      });
    });

    it('should be update favorites, status and error to rejected', () => {
      const action = {
        type: fetchFavoritesAction.rejected.type,
        payload: {
          favoriteOffers: [],
          favoriteOffersStatus: FetchStatus.Pending,
          favoriteOffersError: false,
        },
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        favoriteOffers: [],
        favoriteOffersStatus: FetchStatus.Failed,
        favoriteOffersError: true,
      });
    });
  });

  describe('change favorites status', () => {
    it('should be cange favorite status to pending', () => {
      const action = {
        type: changeFavoriteStatus.pending.type,
        payload: {
          changeFavoriteStatus: FetchStatus.Idle,
        },
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        changeFavoriteStatus: FetchStatus.Pending,
      });
    });

    it('should be cange favorite status to fulfilled', () => {
      const action = {
        type: changeFavoriteStatus.fulfilled.type,
        payload: {
          changeFavoriteStatus: FetchStatus.Pending,
        },
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        changeFavoriteStatus: FetchStatus.Success,
      });
    });

    it('should be cange favorite status to rejected', () => {
      const action = {
        type: changeFavoriteStatus.rejected.type,
        payload: {
          changeFavoriteStatus: FetchStatus.Pending,
        },
      };

      expect(favoritesSlice.reducer(state, action)).toEqual({
        changeFavoriteStatus: FetchStatus.Failed,
      });
    });
  });

});
