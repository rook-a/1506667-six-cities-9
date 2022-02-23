import cn from 'classnames';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import { CITIES, getRatingPercent } from '../../const';
import { Offer } from '../../types/offer';
import Bookmark from '../../components/boormark/boormark';
import { generatePath } from 'react-router-dom';

interface FavoritesProps {
  isEmpty: boolean;
  offers: Offer[];
}

function Favorites({ isEmpty, offers }: FavoritesProps): JSX.Element {
  const containerCls = cn('page__main', 'page__main--favorites', { 'page__main--favorites-empty': isEmpty });
  const favoritesCls = cn('favorites', { 'favorites--empty': isEmpty });

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
                  {offers.map((offer) => {
                    const currentCitys = CITIES.filter((city) => city === offer.city.name && offer.isFavorite === true);
                    return currentCitys.map((currentCity, index) => (
                      <li className="favorites__locations-items" key={index}>
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="/">
                              <span>{currentCity}</span>
                            </a>
                          </div>
                        </div>
                        <div className="favorites__places">
                          {offers.map((offer) => {
                            const { city, id, price, isPremium, isFavorite, title, type, rating, previewImage } = offer;
                            const link = generatePath('/offer/:id', { id: id.toString() });

                            return (
                              city.name === currentCity && (
                                <article className="favorites__card place-card" key={id}>
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
                                    <p className="place-card__type">{type}</p>
                                  </div>
                                </article>
                              )
                            );
                          })}
                        </div>
                      </li>
                    ));
                  })}
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
