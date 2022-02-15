import cn from 'classnames';

import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import Sorting from '../../components/sorting/sorting';

interface MainPageProps {
  numberOfPlaces: number;
  isEmpty: boolean;
}

function MainPage({ numberOfPlaces, isEmpty }: MainPageProps): JSX.Element {
  const containerCls = cn('cities__places-container', 'container', { 'cities__places-container--empty': isEmpty });
  const containerPlacesCls = cn({
    'cities__no-places': isEmpty,
    'cities__places places': !isEmpty,
  });

  return (
    <div className="page page--gray page--main">
      <Header isAuth />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />

        <div className="cities">
          <div className={containerCls}>
            <section className={containerPlacesCls}>
              {isEmpty ? (
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in Dusseldorf
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{numberOfPlaces} places to stay in Amsterdam</b>
                  <Sorting />
                  <PlacesList numberOfPlaces={numberOfPlaces} className={'tabs__content cities__places-list'} />
                </>
              )}
            </section>

            <div className="cities__right-section">{!isEmpty ? <Map className="cities__map" /> : ''}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
