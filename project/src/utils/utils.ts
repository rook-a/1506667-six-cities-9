import { Offer } from '../types/offer';
import { AuthorizationStatus, FetchStatus, SortTypes } from './const';

const MAX_RATING = 5;

export const getRatingPercent = (rating: number) => (Math.round(rating) / MAX_RATING) * 100;

export const getFormatDate = (date: string) => {
  const currentDate = new Date(date);
  const getMonth = currentDate.toLocaleString('en', { month: 'long' });
  const getYear = currentDate.getFullYear();

  return `${getMonth} ${getYear}`;
};

export const sortByPriceLow = (offers: Offer[]) => offers.sort((a, b) => a.price - b.price);
export const sortByPriceHigh = (offers: Offer[]) => offers.sort((a, b) => b.price - a.price);
export const sortByRating = (offers: Offer[]) => offers.sort((a, b) => b.rating - a.rating);

export const sortOffers = (sortType: string, offers: Offer[]) => {
  switch (sortType) {
    case SortTypes.Popular:
      return offers;
    case SortTypes.PriceLow:
      return sortByPriceLow(offers);
    case SortTypes.PriceHigh:
      return sortByPriceHigh(offers);
    case SortTypes.TopRated:
      return sortByRating(offers);
    default:
      throw new Error(`Unexpected sorting type ${sortType}`);
  }
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const isPending = (fetchStatus: FetchStatus): boolean =>
  fetchStatus === FetchStatus.Idle || fetchStatus === FetchStatus.Pending;

export const isAuth = (authorizationStatus: AuthorizationStatus) => authorizationStatus === AuthorizationStatus.Auth;

export const getRandomNumber = (from: number, to: number) =>
  from >= 0 && to > from ? Math.round(Math.random() * (to - from) + from) : 0;
