import CardPlace from '../card-place/card-place';
import { Offer } from '../../types/offer';

interface PlaceListProps {
  offers: Offer[];
  className: string;
  onPlaceCardHover?: (offerId: number | null) => void;
}

function PlacesList({ offers, className, onPlaceCardHover }: PlaceListProps): JSX.Element {
  const handleCardActive = (valueId: number | null) =>
    onPlaceCardHover !== undefined ? onPlaceCardHover(valueId) : null;

  return (
    <div className={`places__list ${className}`}>
      {offers.map((offer) => (
        <CardPlace onCardHover={handleCardActive} offer={offer} key={offer.id} />
      ))}
    </div>
  );
}

export default PlacesList;
