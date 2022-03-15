import { ChangeEvent, Fragment } from 'react';
import { RATING } from '../../utils/const';

interface RatingProps {
  onFormDisabled: boolean;
  onRatingChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  currentRating: number;
}

function Rating({ onFormDisabled, onRatingChange, currentRating }: RatingProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {RATING.map(({ id, title }) => (
        <Fragment key={`${id}`}>
          <input
            className="form__rating-input visually-hidden"
            id={`${id}-stars`}
            name="rating"
            value={id}
            type="radio"
            onChange={onRatingChange}
            checked={id === currentRating}
            disabled={onFormDisabled}
          />
          <label className="reviews__rating-label form__rating-label" htmlFor={`${id}-stars`} title={title}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}

export default Rating;
