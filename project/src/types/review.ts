interface User {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export interface Review {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}

export interface sendUserReview {
  id: number;
  comment: string;
  rating: number;
}
