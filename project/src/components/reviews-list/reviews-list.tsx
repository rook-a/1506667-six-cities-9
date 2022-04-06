import Review from '../review/review';
import { ReviewType } from '../../types/review';

interface ReviewsListProps {
  reviews: ReviewType[];
}

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
