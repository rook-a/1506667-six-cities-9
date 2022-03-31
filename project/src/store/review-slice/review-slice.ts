import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { handleError, isAxiosError } from '../../services/handle-error';
import { rollbar } from '../../services/rollbar';

import { APIRoute, FetchStatus, NameSpace } from '../../utils/const';
import { Review, sendUserReview } from '../../types/review';
import { AppDispatch, State } from '../../types/state';

const MIN_COUNT = 0;
const MAX_COUNT_OF_REVIEWS = 10;
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

export const sendReview = createAsyncThunk<
  sendUserReview,
  sendUserReview,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/sendReview', async ({ id, comment, rating }: sendUserReview, { dispatch, extra: api }) => {
  try {
    const { data } = await api.post<sendUserReview>(`${APIRoute.Comments}/${id}`, { comment, rating });
    return data;
  } catch (err) {
    rollbar.error(err);
    isAxiosError(err);
    handleError(err);
    throw err;
  }
});

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchReviews', async (id: number, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    return data;
  } catch (err) {
    rollbar.error(err);
    isAxiosError(err);
    handleError(err);
    throw err;
  }
});

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
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

const selectReviewState = (state: State) => state[NameSpace.Review];

export const selectReview = (state: State) => selectReviewState(state).reviews;
export const selectReviewStatus = (state: State) => selectReviewState(state).reviewsStatus;
export const selectsendReviewStatus = (state: State) => selectReviewState(state).sendReviewStatus;

export const selectCurrentReview = createSelector(selectReview, (reviews) => {
  return reviews
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.date).getSeconds();
      const dateB = new Date(b.date).getSeconds();

      return dateB - dateA;
    })
    .slice(MIN_COUNT, MAX_COUNT_OF_REVIEWS);
});
