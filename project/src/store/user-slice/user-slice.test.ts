import { userSlice, requireAuthorization, loginAction, logoutAction } from './user-slice';
import { AuthorizationStatus, FetchStatus } from '../../utils/const';

const state = {
  authorizationStatus: AuthorizationStatus.Unknown,
  loginStatus: FetchStatus.Idle,
  logoutStatus: FetchStatus.Idle,
};

describe('User slice', () => {
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
        authrizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: FetchStatus.Idle,
        logoutStatus: FetchStatus.Idle,
      });
    });
  });

  describe('user loginAction', () => {

    it('should update login status to pending', () => {
      const action = {
        type: loginAction.pending.type,
        payload: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: FetchStatus.Idle,
      }};

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: FetchStatus.Pending,
      });
    });

    it('should update login status to fulfilled', () => {
      //создать добавление из fakeLocalStorage
      const action = {
        type: loginAction.fulfilled.type,
        payload: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: FetchStatus.Pending,
      }};

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        loginStatus: FetchStatus.Success,
      });
    });

    it('should update login status to rejected', () => {
      const action = {
        type: loginAction.rejected.type,
        payload: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: FetchStatus.Pending,
      }};

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginStatus: FetchStatus.Failed,
      });
    });
  });

  describe('user logoutAction', () => {
    it('should update logout status to pending', () => {
      const action = {
        type: logoutAction.pending.type,
        payload: {
        authorizationStatus: AuthorizationStatus.Auth,
        logoutStatus: FetchStatus.Idle,
      }};

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        logoutStatus: FetchStatus.Pending,
      });
    });

    it('should update logout status to fulfilled', () => {
      //добавить удаление из fakeLocalStorage
      const action = {
        type: logoutAction.fulfilled.type,
        payload: {
        authorizationStatus: AuthorizationStatus.Auth,
        logoutStatus: FetchStatus.Success,
      }};

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        logoutStatus: FetchStatus.Success,
      });
    });

    it('should update logout status to rejected', () => {
      const action = {
        type: logoutAction.rejected.type,
        payload: {
        authorizationStatus: AuthorizationStatus.Auth,
        logoutStatus: FetchStatus.Pending,
      }};

      expect(userSlice.reducer(state, action)).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        logoutStatus: FetchStatus.Failed,
      });
    });
  });
});
