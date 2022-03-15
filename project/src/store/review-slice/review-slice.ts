import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../index';
import { fetchReviewsAction } from '../api-actions';

import { handleError } from '../../services/handle-error';

import { APIRoute, FetchStatus, NameSpace } from '../../utils/const';
import { Review, sendUserReview } from '../../types/review';

interface InitialState {
  sendReviewStatus: FetchStatus;

  reviews: Review[];
  reviewsStatus: FetchStatus;
  reviewsError: boolean;
}

const initialState: InitialState = {
  sendReviewStatus: FetchStatus.Idle,

  reviews: [],
  reviewsStatus: FetchStatus.Idle,
  reviewsError: false,
};

export const sendReview = createAsyncThunk('user/sendReview', async ({ id, comment, rating }: sendUserReview) => {
  try {
    const { data } = await api.post<sendUserReview>(`${APIRoute.Comments}/${id}`, { comment, rating });
    return data;
  } catch (err) {
    handleError(err);
    throw err;
  }
});

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(sendReview.pending, (state) => {
        state.sendReviewStatus = FetchStatus.Pending;
      })
      .addCase(sendReview.fulfilled, (state) => {
        state.sendReviewStatus = FetchStatus.Success;
      })
      .addCase(sendReview.rejected, (state) => {
        state.sendReviewStatus = FetchStatus.Failed;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsStatus = FetchStatus.Pending;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviewsStatus = FetchStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsStatus = FetchStatus.Failed;
        state.reviewsError = true;
      });
  },
});

export const { loadReviews } = reviewSlice.actions;
