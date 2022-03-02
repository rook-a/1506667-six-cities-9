import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import EmptyFavorites from './empty-favorites';
import CardPlace from '../../components/card-place/card-place';

import { Offer } from '../../types/offer';

interface FavoritesProps {
  offers: Offer[];
}

const mapOffersToCity = (arr: Offer[]) =>
  arr.reduce<{ [key: string]: Offer[] }>((acc, offer) => {
    if (!acc[offer.city.name]) {
      acc[offer.city.name] = [];
    }

    acc[offer.city.name].push(offer);
    return acc;
  }, {});

function Favorites({ offers }: FavoritesProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite === true);
  const favoriteOffersMap = mapOffersToCity(favoriteOffers);

  if (offers.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div className="page">
      <Header isAuth />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(favoriteOffersMap).map((cityName) => (
                <li className="favorites__locations-items" key={cityName}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="/">
                        <span>{cityName}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffersMap[cityName].map((offer) => (
                      <CardPlace offer={offer} isFavorites key={offer.id} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Favorites;
