import { Fragment } from 'react';
import { generatePath } from 'react-router-dom';
import cn from 'classnames';
import styles from './favorites.module.css';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Bookmark from '../../components/boormark/boormark';

import { getRatingPercent } from '../../const';
import { Offer } from '../../types/offer';

interface FavoritesProps {
  offers: Offer[];
}

const mapOffersToCity = (arr: Offer[]) =>
  arr.reduce<{ [key: string]: Offer[] }>((acc, offer) => {
    if (!acc[offer.city.name]) {
      acc[offer.city.name] = [];
    }

    acc[offer.city.name].push(offer);
    return acc;
  }, {});

function Favorites({ offers }: FavoritesProps): JSX.Element {
  const isEmpty = offers.length === 0;
  const containerCls = cn('page__main', 'page__main--favorites', { 'page__main--favorites-empty': isEmpty });
  const favoritesCls = cn('favorites', { 'favorites--empty': isEmpty });
  const favoriteOffers = offers.filter((offer) => offer.isFavorite === true);
  const favoriteOffersMap = mapOffersToCity(favoriteOffers);

  return (
    <div className="page">
      <Header isAuth />

      <main className={containerCls}>
        <div className="page__favorites-container container">
          <section className={favoritesCls}>
            {isEmpty ? (
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">
                    Save properties to narrow down search or plan your future trips.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.keys(favoriteOffersMap).map((cityName) => (
                    <Fragment key={cityName}>
                      <li className="favorites__locations-items">
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="/">
                              <span>{cityName}</span>
                            </a>
                          </div>
                        </div>
                        <div className="favorites__places">
                          {favoriteOffersMap[cityName].map((offer) => {
                            const { id, price, isPremium, isFavorite, title, type, rating, previewImage } = offer;
                            const link = generatePath('/offer/:id', { id: id.toString() });

                            return (
                              <Fragment key={title}>
                                <article className="favorites__card place-card">
                                  {isPremium && (
                                    <div className="place-card__mark">
                                      <span>Premium</span>
                                    </div>
                                  )}
                                  <div className="favorites__image-wrapper place-card__image-wrapper">
                                    <a href={link}>
                                      <img
                                        className="place-card__image"
                                        src={previewImage}
                                        width="150"
                                        height="110"
                                        alt="Shows an incredible apartment."
                                      />
                                    </a>
                                  </div>
                                  <div className="favorites__card-info place-card__info">
                                    <div className="place-card__price-wrapper">
                                      <div className="place-card__price">
                                        <b className="place-card__price-value">{price}</b>
                                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                                      </div>
                                      <Bookmark
                                        isSmall
                                        className={'place-card__bookmark-button'}
                                        isFavorite={isFavorite}
                                      />
                                    </div>
                                    <div className="place-card__rating rating">
                                      <div className="place-card__stars rating__stars">
                                        <span style={{ width: `${getRatingPercent(rating)}%` }}></span>
                                        <span className="visually-hidden">Rating</span>
                                      </div>
                                    </div>
                                    <h2 className="place-card__name">
                                      <a href={link}>{title}</a>
                                    </h2>
                                    <p className={`place-card__type ${styles['place-card__type--text']}`}>{type}</p>
                                  </div>
                                </article>
                              </Fragment>
                            );
                          })}
                        </div>
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Favorites;
