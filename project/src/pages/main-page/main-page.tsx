import { useState } from 'react';

import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import Sorting from '../../components/sorting/sorting';
import EmptyMainPage from './empty-main-page';

import { useAppSelector } from '../../hooks';

import { Offer } from '../../types/offer';
import { State } from '../../types/state';

const ONE_PLACE = 1;

interface MainPageProps {
  offers: Offer[];
}

function MainPage({ offers }: MainPageProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const handlePlaceCardHover = (offerId: number | null) => setSelectedOffer(offerId);
  const { city } = useAppSelector((state: State) => state);
  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  const isEmpty = filteredOffers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header isAuth={true} />

      <main className={`page__main page__main--index ${isEmpty && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs city={city} />

        {isEmpty ? (
          <EmptyMainPage />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {filteredOffers.length} {filteredOffers.length === ONE_PLACE ? 'place' : 'places'} to stay in {city}
                </b>
                <Sorting />
                <PlacesList
                  offers={filteredOffers}
                  className={'tabs__content cities__places-list'}
                  onPlaceCardHover={handlePlaceCardHover}
                />
              </section>

              <div className="cities__right-section">
                <Map
                  className="cities__map"
                  city={filteredOffers[0].city}
                  offers={offers}
                  selectedOffer={selectedOffer}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainPage;
