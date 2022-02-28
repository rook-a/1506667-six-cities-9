import { useState } from 'react';
import cn from 'classnames';

import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import Sorting from '../../components/sorting/sorting';

import { Offer } from '../../types/offer';

interface MainPageProps {
  numberOfPlaces: number;
  offers: Offer[];
}

function MainPage({ numberOfPlaces, offers }: MainPageProps): JSX.Element {
  const isEmpty = numberOfPlaces === 0;
  const containerCls = cn('cities__places-container', 'container', { 'cities__places-container--empty': isEmpty });
  const containerPlacesCls = cn({
    'cities__no-places': isEmpty,
    'cities__places places': !isEmpty,
  });
  const containerMainEmptyCls = cn({
    'page__main--index-empty': isEmpty,
  });

  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);

  const handlePlaceCardHover = (offerId: number | null) => setSelectedOffer(offerId);

  return (
    <div className="page page--gray page--main">
      <Header isAuth={true} />

      <main className={`page__main page__main--index ${containerMainEmptyCls}`}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />

        <div className="cities">
          <div className={containerCls}>
            <section className={containerPlacesCls}>
              {isEmpty ? (
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in Dusseldorf
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{numberOfPlaces} places to stay in Amsterdam</b>
                  <Sorting />
                  <PlacesList
                    offers={offers}
                    className={'tabs__content cities__places-list'}
                    onPlaceCardHover={handlePlaceCardHover}
                  />
                </>
              )}
            </section>

            <div className="cities__right-section">
              {!isEmpty && (
                <Map className="cities__map" city={offers[0].city} offers={offers} selectedOffer={selectedOffer} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
