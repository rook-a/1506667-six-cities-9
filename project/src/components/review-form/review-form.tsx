import { ChangeEvent, FormEvent, useState } from 'react';
import Rating from '../rating/rating';

const MIN_SIGN_COUNT = 50;
const MAX_SIGN_COUNT = 300;

function ReviewsForm(): JSX.Element {
  const [prevCommentValue, setCommentValue] = useState<string>('');
  const [prevRavingValue, setRatingValue] = useState<number>(0);

  const checkedCommentLength = prevCommentValue.length <= MIN_SIGN_COUNT || prevCommentValue.length >= MAX_SIGN_COUNT;
  const checkedRatingValue = prevRavingValue === 0;

  const isDisabled = checkedCommentLength && checkedRatingValue;

  const getRatingValue = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setRatingValue(Number(value));
  };

  const getCommentChange = (evt: { target: { value: string } }) => {
    const { value } = evt.target;
    setCommentValue(value);
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitHandler}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <Rating getRatingValue={getRatingValue} />

      <textarea
        onChange={getCommentChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={prevCommentValue}
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
