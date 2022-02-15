import { CITIES } from '../../const';
import cn from 'classnames';

function Tabs(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((cityName) => (
            <li className="locations__item" key={cityName.toLowerCase()}>
              <a
                className={cn('locations__item-link', 'tabs__item', { 'tabs__item--active': cityName === CITIES[0] })}
                href="/">
                <span>{cityName}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
