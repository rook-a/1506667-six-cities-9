import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { removeUser, setUser } from '../../services/user';

import { APIRoute, AppRoute, AuthorizationStatus, FetchStatus, NameSpace } from '../../utils/const';
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
  sendReviewStatus: FetchStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown,

  loginStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
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

export const loginAction = createAsyncThunk('user/login', async ({ email, password }: AuthData) => {
  try {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });

    store.dispatch(redirectToRoute(AppRoute.Main));
    return data;
  } catch (err) {
    handleError(err);
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    throw err;
  }
});

export const logoutAction = createAsyncThunk('user/logout', async () => {
  try {
    await api.delete(APIRoute.Logout);
  } catch (err) {
    handleError(err);
    throw err;
  }
});

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
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
      .addCase(loginAction.pending, (state) => {
        state.loginStatus = FetchStatus.Pending;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loginStatus = FetchStatus.Success;
        state.authorizationStatus = AuthorizationStatus.Auth;
        setUser(action.payload);
      })
      .addCase(loginAction.rejected, (state) => {
        state.loginStatus = FetchStatus.Failed;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.pending, (state) => {
        state.logoutStatus = FetchStatus.Pending;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.logoutStatus = FetchStatus.Success;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        removeUser();
      })
      .addCase(logoutAction.rejected, (state) => {
        state.logoutStatus = FetchStatus.Failed;
        state.authorizationStatus = AuthorizationStatus.Auth;
      });
  },
});

export const { requireAuthorization } = userProcess.actions;
