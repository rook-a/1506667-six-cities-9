import { Review } from '../types/review';

const AVATAR_URL = 'https://i.pravatar.cc/';

export const reviews: Review[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Mon Jan 21 2022 21:14:46 GMT+0300 (Moscow Standard Time)',
    id: 1,
    rating: 3,
    user: {
      avatarUrl: `${AVATAR_URL}`,
      id: 1,
      isPro: false,
      name: 'Oliver',
    },
  },
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Paris.',
    date: 'Mon Feb 21 2022 21:14:46 GMT+0300 (Moscow Standard Time)',
    id: 2,
    rating: 4,
    user: {
      avatarUrl: `${AVATAR_URL}`,
      id: 1,
      isPro: false,
      name: 'Jeyne',
    },
  },
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Brussels.',
    date: 'Mon Mar 21 2021 21:14:46 GMT+0300 (Moscow Standard Time)',
    id: 3,
    rating: 3,
    user: {
      avatarUrl: `${AVATAR_URL}`,
      id: 1,
      isPro: true,
      name: 'Sam',
    },
  },
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Hamburg.',
    date: 'Mon Dec 21 2021 21:14:46 GMT+0300 (Moscow Standard Time)',
    id: 4,
    rating: 5,
    user: {
      avatarUrl: `${AVATAR_URL}`,
      id: 1,
      isPro: true,
      name: 'Tommy',
    },
  },
];
