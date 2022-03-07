import { Offer } from './types/offer';
import { SortTypes } from './const';

const sortByPriceLow = (offers: Offer[]) => offers.sort((offerOne, offerTwo) => offerOne.price - offerTwo.price);
const sortByPriceHigh = (offers: Offer[]) => offers.sort((offerOne, offerTwo) => offerTwo.price - offerOne.price);
const sortByRating = (offers: Offer[]) => offers.sort((offerOne, offerTwo) => offerTwo.rating - offerOne.rating);

export const sortOffers = (sortType: string, offers: Offer[]) => {
  switch (sortType) {
    case SortTypes.PRICE_LOW:
      return sortByPriceLow(offers);
    case SortTypes.PRICE_HIGH:
      return sortByPriceHigh(offers);
    case SortTypes.TOP_RATED:
      return sortByRating(offers);
    default:
      return offers;
  }
};
