import { useState } from 'react';
import cn from 'classnames';

import { SortTypes } from '../../utils/const';
import { useAppDispatch } from '../../hooks';
import { currentSortType } from '../../store/action';

interface SortingProps {
  sortingType: string;
}

function Sorting({ sortingType }: SortingProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();
  const handleClickSort = (sortType: string) => dispatch(currentSortType(sortType));

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
            onClick={() => {
              handleClickSort(sortType);
              setIsOpened(!isOpened);
            }}>
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
