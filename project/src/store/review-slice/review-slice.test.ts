import { reviewSlice, sendReview, fetchReviewsAction } from "./review-slice";
import { mockReview } from "../../utils/mock";
import { FetchStatus } from "../../utils/const";

const mockReviews = Array.from({length: 5}, () => mockReview);

const state = {
  sendReviewStatus: FetchStatus.Idle,

  reviews: [],
  reviewsStatus: FetchStatus.Idle,
  reviewsError: false,
};

describe('review slice', () => {

  it('without additional parameters should return initial state', () => {
    expect(reviewSlice.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(state);
  });

  describe('send review', () => {
    it('should be update send review status to pending', () => {
      const action = {
        type: sendReview.pending.type,
        payload: {
          sendReviewStatus: FetchStatus.Idle,
        },
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        sendReviewStatus: FetchStatus.Pending,
      });
    });

    it('should be update send review status to fulfilled', () => {
      //добавить ассинхронщину

      const action = {
        type: sendReview.fulfilled.type,
        payload: {
          sendReviewStatus: FetchStatus.Pending,
        },
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        sendReviewStatus: FetchStatus.Success,
      });
    });

    it('should be update send review status to rejected', () => {
      const action = {
        type: sendReview.rejected.type,
        payload: {
          sendReviewStatus: FetchStatus.Pending,
        },
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        sendReviewStatus: FetchStatus.Failed,
      });
    });
  });

  describe('fetch reviews', () => {
    it('should be update reviews, status and error to pending', () => {
      const action = {
        type: fetchReviewsAction.pending.type,
        payload: {
          reviews: [],
          reviewsStatus: FetchStatus.Idle,
          reviewsError: false,
        },
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        reviews: [],
        reviewsStatus: FetchStatus.Pending,
        reviewsError: false,
      });
    });

    it('should be update reviews, status and error to fulfilled', () => {
      //добавить ассинхронщину

      const action = {
        type: fetchReviewsAction.fulfilled.type,
        payload: {
          reviews: [],
          reviewsStatus: FetchStatus.Pending,
          reviewsError: false,
        },
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        reviews: mockReviews,
        reviewsStatus: FetchStatus.Success,
        reviewsError: false,
      });
    });

    it('should be update reviews, status and error to rejected', () => {
      const action = {
        type: fetchReviewsAction.rejected.type,
        payload: {
          reviews: [],
          reviewsStatus: FetchStatus.Pending,
          reviewsError: false,
        },
      };

      expect(reviewSlice.reducer(state, action)).toEqual({
        reviews: [],
        reviewsStatus: FetchStatus.Failed,
        reviewsError: true,
      });
    });
  });

});
