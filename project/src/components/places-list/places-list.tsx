import { useState } from 'react';

import CardPlace from '../card-place/card-place';
import { Offer } from '../../types/offer';

interface PlaceListProps {
  offers: Offer[];
  className: string;
}

function PlacesList({ offers, className }: PlaceListProps): JSX.Element {
  let [offerId, setOfferId] = useState('');

  const mouseEvent = (evt: { target: any }) => {
    const target = evt.target;
    if (target.tagName === 'ARTICLE') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setOfferId((offerId = target.id));
    }
  };

  return (
    <div onMouseOver={mouseEvent} className={`places__list ${className}`}>
      {offers.map((offer) => (
        <CardPlace offer={offer} key={offer.id} />
      ))}
    </div>
  );
}

export default PlacesList;
