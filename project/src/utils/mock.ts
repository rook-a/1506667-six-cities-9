import { image, internet, name, datatype, lorem, date } from 'faker';
import { Offer } from '../types/offer';
import { ReviewType } from '../types/review';

export const mockOffer: Offer = {
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: datatype.number({ min: 3, max: 10, precision: 0.5 }),
      longitude: datatype.number({ min: 3, max: 10, precision: 0.5 }),
      zoom: datatype.number(),
    },
    name: name.findName(),
  },
  description: lorem.sentence(),
  goods: Array.from({ length: datatype.number(5) }, () => lorem.word()),
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.findName(),
  },
  id: 12345,
  images: Array.from({ length: datatype.number(5) }, () => image.city()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.number({ min: 3, max: 10, precision: 0.5 }),
    longitude: datatype.number({ min: 3, max: 10, precision: 0.5 }),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: image.city(),
  price: datatype.number(),
  rating: datatype.number(5),
  title: lorem.words(),
  type: lorem.word(),
};

export const mockReview: ReviewType = {
  comment: lorem.sentence(20),
  date: `${date.past()}`,
  id: datatype.number(),
  rating: datatype.number(5),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.findName(),
  },
};
