import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';

import { selectReviewStatus, selectCurrentReview } from '../../store/review-slice/review-slice';
import { useAppSelector } from '../../hooks';

import { AuthorizationStatus, FetchStatus } from '../../utils/const';
import { isAuth } from '../../utils/utils';

interface ReviewsProps {
  authorizationStatus: AuthorizationStatus;
  offerId: number;
}

function Reviews({ authorizationStatus, offerId }: ReviewsProps): JSX.Element {
  const reviews = useAppSelector(selectCurrentReview);
  const reviewsStatus = useAppSelector(selectReviewStatus);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {reviewsStatus === FetchStatus.Failed && (
        <p style={{ marginTop: '0', marginBottom: '30px', textAlign: 'center', color: '#FF0000' }}>
          There should be reviews, but something went wrong. Try refreshing this page
        </p>
      )}
      {reviewsStatus === FetchStatus.Success && <ReviewsList reviews={reviews} />}
      {isAuth(authorizationStatus) && <ReviewForm offerId={offerId} />}
    </section>
  );
}

export default Reviews;
