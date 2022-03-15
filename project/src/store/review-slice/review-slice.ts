import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../index';
import { handleError } from '../../services/handle-error';
import { Review, sendUserReview } from '../../types/review';
import { APIRoute, FetchStatus, NameSpace } from '../../utils/const';

interface InitialState {
  sendReviewStatus: FetchStatus;
  reviews: Review[];
}

const initialState: InitialState = {
  sendReviewStatus: FetchStatus.Idle,
  reviews: [],
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
      });
  },
});

export const { loadReviews } = reviewSlice.actions;
