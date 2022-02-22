import { Review } from '../types/review';

const AVATAR_URL = 'https://i.pravatar.cc/';

export const reviews: Review[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Mon Feb 21 2022 21:14:46 GMT+0300 (Moscow Standard Time)',
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
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Berlin.',
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
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Madrid.',
    date: 'Mon Feb 21 2022 21:14:46 GMT+0300 (Moscow Standard Time)',
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
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Tokio.',
    date: 'Mon Feb 21 2022 21:14:46 GMT+0300 (Moscow Standard Time)',
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
