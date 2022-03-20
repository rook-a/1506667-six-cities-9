import { useCallback, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { selectCity, selectSortType } from '../../store/app-slice/app-slice';
import PlacesList from '../places-list/places-list';
import Sorting from '../sorting/sorting';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';

const ONE_PLACE = 1;

interface MainContentProps {
  offers: Offer[];
}

function MainContent({ offers }: MainContentProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);

  const city = useAppSelector(selectCity);
  const sortType = useAppSelector(selectSortType);

  const handlePlaceCardHover = useCallback((offerId: number | null) => {
    setSelectedOffer(offerId);
  }, []);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offers.length} {offers.length === ONE_PLACE ? 'place' : 'places'} to stay in {city}
          </b>
          <Sorting sortingType={sortType} />
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
  );
}

export default MainContent;
