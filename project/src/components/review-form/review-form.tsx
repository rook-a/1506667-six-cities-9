import { ChangeEvent, FormEvent, useState } from 'react';
import Rating from '../rating/rating';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

function ReviewsForm(): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('0');

  const isDisabled = rating === '0' || comment.length <= MIN_COMMENT_LENGTH || comment.length >= MAX_COMMENT_LENGTH;

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
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <Rating onRatingChange={handleRatingChange} currentRating={Number(rating)} />

      <textarea
        onChange={handleCommentChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={comment}
        placeholder="Tell how was your stay, what you like and what can be improved"
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
