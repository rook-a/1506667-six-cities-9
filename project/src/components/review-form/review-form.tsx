import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Rating from '../rating/rating';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-actions';

import { FetchStatus } from '../../utils/const';
import { sendReview } from '../../store/review-slice/review-slice';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

interface ReviewsFormProps {
  offerId: number;
}

function ReviewsForm({ offerId }: ReviewsFormProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('0');
  const dispatch = useAppDispatch();
  const { sendReviewStatus } = useAppSelector(({ Review }) => Review);

  useEffect(() => {
    if (sendReviewStatus === FetchStatus.Success) {
      setComment('');
      setRating('0');
      dispatch(fetchReviewsAction(offerId));
    }
  }, [dispatch, offerId, sendReviewStatus]);

  const isDisabled = rating === '0' || comment.length <= MIN_COMMENT_LENGTH || comment.length >= MAX_COMMENT_LENGTH;
  const isFormDisabled = sendReviewStatus === FetchStatus.Pending;

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setRating(value);
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setComment(value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendReview({ id: offerId, comment, rating: Number(rating) }));
  };

  if (sendReviewStatus === FetchStatus.Failed) {
    toast.info('Some unexpected error. Try again!');
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <Rating onFormDisabled={isFormDisabled} onRatingChange={handleRatingChange} currentRating={Number(rating)} />

      <textarea
        onChange={handleCommentChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={comment}
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isFormDisabled}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled || isFormDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
