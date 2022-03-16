import { useCallback, useState } from 'react';

import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import Sorting from '../../components/sorting/sorting';
import EmptyMainPage from './empty-main-page';

import { useAppSelector } from '../../hooks';
import { selectRequireAuthrization } from '../../store/user-slice/user-slice';
import { selectOffers } from '../../store/offers-slice/offers-slice';

import { sortOffers, isAuth } from '../../utils/utils';

import { selectCity, selectSortType } from '../../store/app-slice/app-slice';
import { createSelector } from 'reselect';

const ONE_PLACE = 1;

function MainPage(): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  // const offers = useAppSelector(selectOffers);
  const state = useAppSelector((state) => state);
  const city = useAppSelector(selectCity);
  const sortType = useAppSelector(selectSortType);
  const authorizationStatus = useAppSelector(selectRequireAuthrization);

  // const handlePlaceCardHover = (offerId: number | null) => setSelectedOffer(offerId);
  const handlePlaceCardHover = useCallback((offerId: number | null) => {
    setSelectedOffer(offerId);
  }, []);

  const filtered = createSelector(selectCity, selectOffers, (city, offers) => {
    return offers.filter((offer) => offer.city.name === city);
  });
  const filteredOffers = filtered(state);
  const isEmpty = filteredOffers.length === 0;

  const sortedOffers = createSelector(selectSortType, (sortType) => sortOffers(sortType, filteredOffers));

  return (
    <div className="page page--gray page--main">
      <Header isAuth={isAuth(authorizationStatus)} />

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
                <Sorting sortingType={sortType} />
                <PlacesList
                  offers={sortedOffers(state)}
                  className={'tabs__content cities__places-list'}
                  onPlaceCardHover={handlePlaceCardHover}
                />
              </section>

              <div className="cities__right-section">
                <Map
                  className="cities__map"
                  city={filteredOffers[0].city}
                  offers={filteredOffers}
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
