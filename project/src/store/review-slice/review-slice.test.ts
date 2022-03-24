import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { createAPI } from '../../services/api';
import { reviewSlice, sendReview, fetchReviewsAction } from './review-slice';

import { APIRoute, FetchStatus } from '../../utils/const';
import { mockReview } from '../../utils/mock';
import { State } from '../../types/state';
import { sendUserReview } from '../../types/review';

const mockReviews = Array.from({ length: 5 }, () => mockReview);

const state = {
  sendReviewStatus: FetchStatus.Idle,

  reviews: [],
  reviewsStatus: FetchStatus.Idle,
  reviewsError: false,
};

describe('review slice', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviewSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  describe('review: async action', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];

    const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

    it('should dispatch fetch review when GET /comments/id', async () => {
      mockAPI.onGet(`${APIRoute.Comments}/${1}`).reply(200, mockReviews);

      const store = mockStore();

      await store.dispatch(fetchReviewsAction(1));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchReviewsAction.pending.type);
      expect(actions).toContain(fetchReviewsAction.fulfilled.type);
      expect(actions).not.toContain(fetchReviewsAction.rejected.type);
    });

    it('should dispatch send review when POST /comments/id', async () => {
      const fakeComment: sendUserReview = { id: 1, comment: 'test', rating: 4 };

      mockAPI.onPost(`${APIRoute.Comments}/${1}`).reply(204);

      const store = mockStore();

      await store.dispatch(sendReview(fakeComment));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(sendReview.pending.type);
      expect(actions).toContain(sendReview.fulfilled.type);
      expect(actions).not.toContain(sendReview.rejected.type);
    });
  });

  describe('send review', () => {
    it('should be update send review status to pending', () => {
      const action = {
        type: sendReview.pending.type,
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        sendReviewStatus: FetchStatus.Pending,

        reviews: [],
        reviewsStatus: FetchStatus.Idle,
        reviewsError: false,
      });
    });

    it('should be update send review status to fulfilled', () => {
      const action = {
        type: sendReview.fulfilled.type,
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        sendReviewStatus: FetchStatus.Success,

        reviews: [],
        reviewsStatus: FetchStatus.Idle,
        reviewsError: false,
      });
    });

    it('should be update send review status to rejected', () => {
      const action = {
        type: sendReview.rejected.type,
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        sendReviewStatus: FetchStatus.Failed,

        reviews: [],
        reviewsStatus: FetchStatus.Idle,
        reviewsError: false,
      });
    });
  });

  describe('fetch reviews', () => {
    it('should be update reviews, status and error to pending', () => {
      const action = {
        type: fetchReviewsAction.pending.type,
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        reviews: [],
        reviewsStatus: FetchStatus.Pending,
        reviewsError: false,

        sendReviewStatus: FetchStatus.Idle,
      });
    });

    it('should be update reviews, status and error to fulfilled', () => {
      const action = {
        type: fetchReviewsAction.fulfilled.type,
        payload: {
          mockReviews,
        },
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        reviews: action.payload,
        reviewsStatus: FetchStatus.Success,
        reviewsError: false,

        sendReviewStatus: FetchStatus.Idle,
      });
    });

    it('should be update reviews, status and error to rejected', () => {
      const action = {
        type: fetchReviewsAction.rejected.type,
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        reviews: [],
        reviewsStatus: FetchStatus.Failed,
        reviewsError: true,

        sendReviewStatus: FetchStatus.Idle,
      });
    });
  });
});
