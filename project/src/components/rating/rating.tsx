import { ChangeEvent, Fragment } from 'react';
import { RATING } from '../../const';

interface RatingProps {
  getRatingValue: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function Rating({ getRatingValue }: RatingProps): JSX.Element {
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
            onChange={getRatingValue}
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
