import { useCallback, useState } from 'react';

import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import Sorting from '../../components/sorting/sorting';
import EmptyMainPage from './empty-main-page';

import { useAppSelector } from '../../hooks';
import { selectRequireAuthrization } from '../../store/user-slice/user-slice';
import { selectCity, selectSortType } from '../../store/app-slice/app-slice';
import { selectCurrentOffers } from '../../store/offers-slice/offers-slice';

import { isAuth } from '../../utils/utils';

const ONE_PLACE = 1;

function MainPage(): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);

  const currentOffers = useAppSelector(selectCurrentOffers);

  const city = useAppSelector(selectCity);
  const sortType = useAppSelector(selectSortType);
  const authorizationStatus = useAppSelector(selectRequireAuthrization);

  const handlePlaceCardHover = useCallback((offerId: number | null) => {
    setSelectedOffer(offerId);
  }, []);

  const isEmpty = currentOffers.length === 0;

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
                  {currentOffers.length} {currentOffers.length === ONE_PLACE ? 'place' : 'places'} to stay in {city}
                </b>
                <Sorting sortingType={sortType} />
                <PlacesList
                  offers={currentOffers}
                  className={'tabs__content cities__places-list'}
                  onPlaceCardHover={handlePlaceCardHover}
                />
              </section>

              <div className="cities__right-section">
                <Map
                  className="cities__map"
                  city={currentOffers[0].city}
                  offers={currentOffers}
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
