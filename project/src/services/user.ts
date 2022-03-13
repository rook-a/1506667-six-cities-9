import { UserData } from '../types/user-data';

const USER_DATA_KEY = 'six-cities-token';

export type Token = string;

export const getUser = (): UserData => {
  const user = localStorage.getItem(USER_DATA_KEY);

  return user ? JSON.parse(user) : {};
};

export const getToken = (): Token => {
  const { token } = getUser();

  return token ?? '';
};

export const setUser = (user: UserData): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_DATA_KEY);
};
