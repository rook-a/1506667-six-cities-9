import { useState } from 'react';

import CardPlace from '../card-place/card-place';
import { Offer } from '../../types/offer';

interface PlaceListProps {
  offers: Offer[];
  className: string;
}

function PlacesList({ offers, className }: PlaceListProps): JSX.Element {
  const [, setOfferId] = useState<number | null>(null);

  const handleCardActive = (valueId: number | null) => setOfferId(valueId);

  return (
    <div className={`places__list ${className}`}>
      {offers.map((offer) => (
        <CardPlace onCardHover={handleCardActive} offer={offer} key={offer.id} />
      ))}
    </div>
  );
}

export default PlacesList;
