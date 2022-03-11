export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

enum RatingLabels {
  PERFECT = 'perfect',
  GOOD = 'good',
  NOT_BAD = 'not bad',
  BADLY = 'badly',
  TERRIBLY = 'terribly',
}

export const RATING = [
  {
    id: 5,
    title: RatingLabels.PERFECT,
  },
  {
    id: 4,
    title: RatingLabels.GOOD,
  },
  {
    id: 3,
    title: RatingLabels.NOT_BAD,
  },
  {
    id: 2,
    title: RatingLabels.BADLY,
  },
  {
    id: 1,
    title: RatingLabels.TERRIBLY,
  },
];

export enum AppRoute {
  MAIN = '/',
  FAVORITES = '/favorites',
  PROPERTY = '/offer',
  LOGIN = '/login',
  NOT_FOUND = '*',
}

export enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}

export enum SortTypes {
  POPULAR = 'Popular',
  PRICE_LOW = 'Price: low to high',
  PRICE_HIGH = 'Price: high to low',
  TOP_RATED = 'Top rated first',
}

export enum APIRoute {
  OFFERS = '/hotels',
  FAVORITES = '/favorite',
  CHANGE_FAVORITES_STATUS = '/favorite/{hotelId}/{status}',
  COMMENTS = '/comments',
  LOGIN = '/login',
  LOGOUT = '/logout',
}

export enum HttpCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum FetchStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
