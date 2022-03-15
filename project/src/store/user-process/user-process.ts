import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { removeUser, setUser } from '../../services/user';

import { APIRoute, AppRoute, AuthorizationStatus, FetchStatus, NameSpaces } from '../../utils/const';
import { sendUserReview } from '../../types/review';
import { api, store } from '../index';
import { handleError } from '../../services/handle-error';
import { UserData } from '../../types/user-data';
import { redirectToRoute } from '../action';
import { AuthData } from '../../types/auth-data';

interface InitialState {
  sendReviewStatus: FetchStatus;
  authorizationStatus: AuthorizationStatus;

  loginStatus: FetchStatus;
  logoutStatus: FetchStatus;
}

const initialState: InitialState = {
  sendReviewStatus: FetchStatus.IDLE,
  authorizationStatus: AuthorizationStatus.UNKNOWN,

  loginStatus: FetchStatus.IDLE,
  logoutStatus: FetchStatus.IDLE,
};

export const sendReview = createAsyncThunk('user/sendReview', async ({ id, comment, rating }: sendUserReview) => {
  try {
    const { data } = await api.post<sendUserReview>(`${APIRoute.COMMENTS}/${id}`, { comment, rating });
    return data;
  } catch (err) {
    handleError(err);
    throw err;
  }
});

export const loginAction = createAsyncThunk('user/login', async ({ email, password }: AuthData) => {
  try {
    const { data } = await api.post<UserData>(APIRoute.LOGIN, { email, password });

    store.dispatch(redirectToRoute(AppRoute.MAIN));
    return data;
  } catch (err) {
    handleError(err);
    store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
    throw err;
  }
});

export const logoutAction = createAsyncThunk('user/logout', async () => {
  try {
    await api.delete(APIRoute.LOGOUT);
  } catch (err) {
    handleError(err);
    throw err;
  }
});

export const userProcess = createSlice({
  name: NameSpaces.USER,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(sendReview.pending, (state) => {
        state.sendReviewStatus = FetchStatus.PENDING;
      })
      .addCase(sendReview.fulfilled, (state) => {
        state.sendReviewStatus = FetchStatus.SUCCESS;
      })
      .addCase(sendReview.rejected, (state) => {
        state.sendReviewStatus = FetchStatus.FAILED;
      })
      .addCase(loginAction.pending, (state) => {
        state.loginStatus = FetchStatus.PENDING;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loginStatus = FetchStatus.SUCCESS;
        state.authorizationStatus = AuthorizationStatus.AUTH;
        setUser(action.payload);
      })
      .addCase(loginAction.rejected, (state) => {
        state.loginStatus = FetchStatus.FAILED;
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(logoutAction.pending, (state) => {
        state.logoutStatus = FetchStatus.PENDING;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.logoutStatus = FetchStatus.SUCCESS;
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
        removeUser();
      })
      .addCase(logoutAction.rejected, (state) => {
        state.logoutStatus = FetchStatus.FAILED;
        state.authorizationStatus = AuthorizationStatus.AUTH;
      });
  },
});

export const { requireAuthorization } = userProcess.actions;
