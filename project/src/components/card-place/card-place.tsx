import { Link, generatePath } from 'react-router-dom';
import Bookmark from '../boormark/boormark';

interface CardPlaceProp {
  placeId: number;
}

function CardPlace({ placeId }: CardPlaceProp): JSX.Element {
  const link = generatePath('/offer/:id', { id: placeId.toString() });

  return (
    <article className="cities__place-card place-card">
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={link} title="Show offer">
          <img
            className="place-card__image"
            src="img/room.jpg"
            width="260"
            height="200"
            alt="Shows an incredible room."
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;80</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark isSmall isActive />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={link} title="Show offer">
            Wood and stone place
          </Link>
        </h2>
        <p className="place-card__type">Private room</p>
      </div>
    </article>
  );
}

export default CardPlace;
