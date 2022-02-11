import Logo from '../logo/logo';
import Nav from '../nav/nav';
import CardPlace from '../card place/card-place';
import Tabs from '../tabs/tabs';
import Map from '../map/map';

type numberOfPlacesProp = {
  numberOfPlaces: number;
}

function MainPage({numberOfPlaces}: numberOfPlacesProp): JSX.Element {
  return (
    <div className="page page--gray page--main">

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">

              <Logo />

            </div>

            <Nav />

          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">

          <Tabs />

        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{numberOfPlaces} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">

                <CardPlace />
                <CardPlace />
                <CardPlace />
                <CardPlace />
                <CardPlace />

              </div>
            </section>
            <div className="cities__right-section">

              <Map />

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
