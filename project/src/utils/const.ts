import Rollbar from 'rollbar';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

enum RatingLabels {
  Perfect = 'perfect',
  Good = 'good',
  NotBad = 'not bad',
  Badly = 'badly',
  Terribly = 'terribly',
}

export const RATING = [
  {
    id: 5,
    title: RatingLabels.Perfect,
  },
  {
    id: 4,
    title: RatingLabels.Good,
  },
  {
    id: 3,
    title: RatingLabels.NotBad,
  },
  {
    id: 2,
    title: RatingLabels.Badly,
  },
  {
    id: 1,
    title: RatingLabels.Terribly,
  },
];

export enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  Property = '/offer',
  Login = '/login',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export enum SortTypes {
  Popular = 'Popular',
  PriceLow = 'Price: low to high',
  PriceHigh = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum APIRoute {
  Offers = '/hotels',
  Favorites = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum FetchStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Failed = 'Failed',
}

export enum NameSpace {
  App = 'App',
  User = 'User',
  Offers = 'Offers',
  Review = 'Review',
  Favorites = 'Favorites',
}

export const rollbarConfig: Rollbar.Configuration = {
  accessToken: '5a09cc4879534a72b3afd23cce6f87df',
  hostSafeList: ['localhost:3000'],
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0',
        source_map_enabled: true,
      },
    },
  },
};
