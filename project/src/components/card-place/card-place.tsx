import { Link, generatePath } from 'react-router-dom';
import cn from 'classnames';

import Bookmark from '../boormark/boormark';

import { Offer } from '../../types/offer';
import { getRatingPercent } from '../../utils/utils';

import styles from './card-place.module.css';

interface CardPlaceProp {
  offer: Offer;
  isFavorites?: boolean;
  onCardHover?: (id: number | null) => void;
}

function CardPlace({ offer, isFavorites, onCardHover }: CardPlaceProp): JSX.Element {
  const link = generatePath('/offer/:id', { id: `${offer.id}` });

  const favorites = {
    imgWidth: isFavorites ? 150 : 260,
    imgHeight: isFavorites ? 110 : 200,
    containerCls: isFavorites ? 'favorites__card' : 'cities__place-card',
    wrapperCls: isFavorites ? 'favorites__image-wrapper' : 'cities__image-wrapper',
  };

  const { description, type, price, isFavorite, previewImage, title, rating, id, isPremium } = offer;

  //думаю нужно их объединить в одну. сейчас, вроде как, передаются две разные ссылки
  const handleCardHover = () => (onCardHover !== undefined ? onCardHover(id) : null);
  const handleCardHoverRemove = () => (onCardHover !== undefined ? onCardHover(null) : null);

  return (
    <article
      onMouseOver={handleCardHover}
      onMouseLeave={handleCardHoverRemove}
      className={`place-card ${favorites.containerCls}`}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper ${favorites.wrapperCls}`}>
        <Link to={link} title="Show offer">
          <img
            className="place-card__image"
            src={previewImage}
            width={`${favorites.imgWidth}`}
            height={`${favorites.imgHeight}`}
            alt={description}
          />
        </Link>
      </div>
      <div className={cn('place-card__info', { 'favorites__card-info': isFavorite })}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark isSmall className={'place-card__bookmark-button'} isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingPercent(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={link} title="Show offer">
            {title}
          </Link>
        </h2>
        <p className={`place-card__type ${styles['place-card__type--text']}`}>{type}</p>
      </div>
    </article>
  );
}

export default CardPlace;
