export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

enum Features {
  WI_FI = 'Wi-Fi',
  WASHING_MACHINE = 'Washing machine',
  TOWELS = 'Towels',
  HEATING = 'Heating',
  COFFEE_MACHINE = 'Coffee machine',
  BABY_SEAT = 'Baby seat',
  KITCHEN = 'Kitchen',
  DISHWASHER = 'Dishwasher',
  CABEL_TV = 'Cabel TV',
  FRIDGE = 'Fridge',
}

export const FEATURES = [
  Features.WI_FI,
  Features.WASHING_MACHINE,
  Features.TOWELS,
  Features.HEATING,
  Features.COFFEE_MACHINE,
  Features.BABY_SEAT,
  Features.KITCHEN,
  Features.DISHWASHER,
  Features.CABEL_TV,
  Features.FRIDGE,
];

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

const MAX_RATING = 5;

export const getRatingPercent = (rating: number) => (rating / MAX_RATING) * 100;

export const getFormatDate = (date: string) => {
  const currentDate = new Date(date);
  const getMonth = currentDate.toLocaleString('en', { month: 'long' });
  const getYear = currentDate.getFullYear();

  return `${getMonth} ${getYear}`;
};
