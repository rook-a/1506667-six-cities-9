import CardPlace from '../card-place/card-place';

type PlaceListProps = {
  numberOfPlaces: number;
}

function PlacesList({numberOfPlaces}: PlaceListProps): JSX.Element {
  const arrayPlaces = [...Array(numberOfPlaces)].map((item, index) => index + 1);

  return (
    <div className="cities__places-list places__list tabs__content">

      {arrayPlaces.map((count) => <CardPlace key={count} />)}

    </div>
  );
}

export default PlacesList;
