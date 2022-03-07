import { Offer } from '../types/offer';
import { SortTypes } from './const';

const MAX_RATING = 5;

export const getRatingPercent = (rating: number) => (rating / MAX_RATING) * 100;

export const getFormatDate = (date: string) => {
  const currentDate = new Date(date);
  const getMonth = currentDate.toLocaleString('en', { month: 'long' });
  const getYear = currentDate.getFullYear();

  return `${getMonth} ${getYear}`;
};

const sortByPriceLow = (offers: Offer[]) => offers.sort((a, b) => a.price - b.price);
const sortByPriceHigh = (offers: Offer[]) => offers.sort((a, b) => b.price - a.price);
const sortByRating = (offers: Offer[]) => offers.sort((a, b) => b.rating - a.rating);

export const sortOffers = (sortType: string, offers: Offer[]) => {
  switch (sortType) {
    case SortTypes.POPULAR:
      return offers;
    case SortTypes.PRICE_LOW:
      return sortByPriceLow(offers);
    case SortTypes.PRICE_HIGH:
      return sortByPriceHigh(offers);
    case SortTypes.TOP_RATED:
      return sortByRating(offers);
    default:
      throw new Error(`Unexpected sorting type ${sortType}`);
  }
};
