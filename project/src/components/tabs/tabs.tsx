import { cities } from '../../const';

function Tabs(): JSX.Element {
  const isChecked = (cityName: string): string =>
    cityName === 'Amsterdam' ? 'tabs__item--active' : '';

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((cityName) => (
            <li className="locations__item" key={cityName.toLowerCase()}>
              <a
                className={`locations__item-link tabs__item ${isChecked(
                  cityName
                )}`}
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
