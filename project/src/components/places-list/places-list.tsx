import CardPlace from '../card-place/card-place';

interface PlaceListProps {
  numberOfPlaces: number;
  className: string;
}

function PlacesList({ numberOfPlaces, className }: PlaceListProps): JSX.Element {
  const arrayPlaces = [...Array(numberOfPlaces)].map((item, index) => index + 1);

  return (
    <div className={`places__list ${className}`}>
      {arrayPlaces.map((count) => (
        <CardPlace key={count} />
      ))}
    </div>
  );
}

export default PlacesList;
