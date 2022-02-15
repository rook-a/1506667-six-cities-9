import { RATING } from '../../const';

function Rating(): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {RATING.map(({ id, title }) => (
        <label className="reviews__rating-label form__rating-label" title={title} key={`${id}`}>
          <input className="form__rating-input visually-hidden" name="rating" value={id} type="radio" />

          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      ))}
    </div>
  );
}

export default Rating;
