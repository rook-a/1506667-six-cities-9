import CardPlace from '../card-place/card-place';
import { Offer } from '../../types/offer';
import { memo } from 'react';

interface PlaceListProps {
  offers: Offer[];
  className: string;
  onPlaceCardHover?: (offerId: number | null) => void;
}

function PlacesList({ offers, className, onPlaceCardHover }: PlaceListProps): JSX.Element {
  return (
    <div className={`places__list ${className}`}>
      {offers.map((offer) => (
        <CardPlace onCardHover={onPlaceCardHover} offer={offer} key={offer.id} />
      ))}
    </div>
  );
}

export default memo(PlacesList);
