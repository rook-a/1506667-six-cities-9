import { useState } from 'react';

import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import Sorting from '../../components/sorting/sorting';
import EmptyMainPage from './empty-main-page';

import { Offer } from '../../types/offer';

interface MainPageProps {
  numberOfPlaces: number;
  offers: Offer[];
}

function MainPage({ numberOfPlaces, offers }: MainPageProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const handlePlaceCardHover = (offerId: number | null) => setSelectedOffer(offerId);

  if (offers.length === 0) {
    return <EmptyMainPage />;
  }

  return (
    <div className="page page--gray page--main">
      <Header isAuth={true} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{numberOfPlaces} places to stay in Amsterdam</b>
              <Sorting />
              <PlacesList
                offers={offers}
                className={'tabs__content cities__places-list'}
                onPlaceCardHover={handlePlaceCardHover}
              />
            </section>

            <div className="cities__right-section">
              <Map className="cities__map" city={offers[0].city} offers={offers} selectedOffer={selectedOffer} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
