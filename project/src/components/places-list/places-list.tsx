import CardPlace from '../card-place/card-place';
import { Offer } from '../../types/offer';

interface PlaceListProps {
  offers: Offer[];
  className: string;
  onPlacesListHover: (offerId: number | null) => void;
}

function PlacesList({ offers, className, onPlacesListHover }: PlaceListProps): JSX.Element {
  const handleCardActive = (valueId: number | null) => onPlacesListHover(valueId);

  return (
    <div className={`places__list ${className}`}>
      {offers.map((offer) => (
        <CardPlace onCardHover={handleCardActive} offer={offer} key={offer.id} />
      ))}
    </div>
  );
}

export default PlacesList;
