import cn from 'classnames';
import { useAppDispatch } from '../../hooks';
import { currentCity } from '../../store/action';
import { CITIES } from '../../const';

interface TabsProps {
  city: string;
}

function Tabs({ city }: TabsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleClickTab = (cityName: string) => dispatch(currentCity(cityName));

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((cityName) => (
            <li className="locations__item" key={cityName.toLowerCase()}>
              <a
                className={cn('locations__item-link', 'tabs__item', { 'tabs__item--active': cityName === city })}
                href="/"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleClickTab(cityName);
                }}>
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
