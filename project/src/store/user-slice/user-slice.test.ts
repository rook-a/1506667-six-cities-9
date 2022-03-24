import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../../services/api';
import { userSlice, requireAuthorization, loginAction, logoutAction, checkAuthAction } from './user-slice';

import { APIRoute, AppRoute, AuthorizationStatus, FetchStatus } from '../../utils/const';
import { State } from '../../types/state';
import { AuthData } from '../../types/auth-data';
import { redirectToRoute } from '../action';

const state = {
  authorizationStatus: AuthorizationStatus.Unknown,
  loginStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
};

describe('User slice', () => {
  describe('user: async actions', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];

    const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

    it('should authorization status is «auth» when server return 200', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.Login).reply(200, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(requireAuthorization.toString());
    });

    it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
      const fakeUser: AuthData = { email: 'test@test.de', password: 'kek123456' };

      mockAPI.onPost(APIRoute.Login).reply(200, { token: 'secretToken' });

      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(fakeUser));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(loginAction.pending.type);
      expect(actions).toContain(redirectToRoute(AppRoute.Main).type);
      expect(actions).toContain(loginAction.fulfilled.type);
      expect(actions).not.toContain(loginAction.rejected.type);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secretToken');
    });

    it('should dispatch Logout when Delete /logout', async () => {
      mockAPI.onDelete(APIRoute.Logout).reply(204);

      const store = mockStore();
      Storage.prototype.removeItem = jest.fn();

      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(logoutAction.pending.type);
      expect(actions).toContain(logoutAction.fulfilled.type);
      expect(actions).not.toContain(logoutAction.rejected.type);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
    });
  });

  describe('user authorization', () => {
    it('without additional parameters should return initial state', () => {
      expect(userSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
    });

    it('should update authrization status to "Auth"', () => {
      expect(userSlice.reducer(state, requireAuthorization(AuthorizationStatus.Auth))).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        loginStatus: FetchStatus.Idle,
        logoutStatus: FetchStatus.Idle,
      });
    });

    it('should update authrization status to "NoAuth"', () => {
      expect(userSlice.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth))).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,

        loginStatus: FetchStatus.Idle,
        logoutStatus: FetchStatus.Idle,
      });
    });
  });

  describe('user loginAction', () => {
    it('should update login status to pending', () => {
      const action = {
        type: loginAction.pending.type,
      };

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        loginStatus: FetchStatus.Pending,
        logoutStatus: FetchStatus.Idle,
      });
    });

    it('should update login status to fulfilled', () => {
      const action = {
        type: loginAction.fulfilled.type,
      };

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        loginStatus: FetchStatus.Success,
        logoutStatus: FetchStatus.Idle,
      });
    });

    it('should update login status to rejected', () => {
      const action = {
        type: loginAction.rejected.type,
      };

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: FetchStatus.Failed,
        logoutStatus: FetchStatus.Idle,
      });
    });
  });

  describe('user logoutAction', () => {
    it('should update logout status to pending', () => {
      const action = {
        type: logoutAction.pending.type,
      };

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        loginStatus: FetchStatus.Idle,
        logoutStatus: FetchStatus.Pending,
      });
    });

    it('should update logout status to fulfilled', () => {
      const action = {
        type: logoutAction.fulfilled.type,
      };

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: FetchStatus.Idle,
        logoutStatus: FetchStatus.Success,
      });
    });

    it('should update logout status to rejected', () => {
      const action = {
        type: logoutAction.rejected.type,
      };

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        loginStatus: FetchStatus.Idle,
        logoutStatus: FetchStatus.Failed,
      });
    });
  });
});
