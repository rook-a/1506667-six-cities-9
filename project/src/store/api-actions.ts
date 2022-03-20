import { createAsyncThunk } from '@reduxjs/toolkit';

import { api, store } from '../store/index';
import { requireAuthorization } from './user-slice/user-slice';

import { handleError } from '../services/handle-error';

import { APIRoute, AuthorizationStatus } from '../utils/const';

export const checkAuthAction = createAsyncThunk('user/checkAuth', async () => {
  try {
    await api.get(APIRoute.Login);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch (err) {
    handleError(err);
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});
