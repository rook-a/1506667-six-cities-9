import { useState } from 'react';
import cn from 'classnames';

import { SortTypes } from '../../const';

interface SortingProps {
  sortingType: string;
  onSortClick: (value: string) => void;
}

function Sorting({ sortingType, onSortClick }: SortingProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpened(!isOpened)}>
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options', 'places__options--custom', { 'places__options--opened': isOpened })}>
        {Object.values(SortTypes).map((sortType) => (
          <li
            className={cn('places__option', { 'places__option--active': sortType === sortingType })}
            tabIndex={0}
            key={sortType}
            onClick={() => onSortClick(sortType)}>
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
