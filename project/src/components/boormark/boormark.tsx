import { useState } from 'react';

interface BookmarkProps {
  isSmall: boolean;
  isFavorite: boolean;
}

function Bookmark({ isSmall, isFavorite }: BookmarkProps): JSX.Element {
  let [value, setValue] = useState(isFavorite);

  const bookmark = {
    width: isSmall ? 18 : 31,
    height: isSmall ? 19 : 33,
    className: isSmall ? 'place-card__bookmark-button' : 'property__bookmark-button',
    activeCls: value ? 'place-card__bookmark-button--active' : '',
    text: value ? 'In bookmarks' : 'To bookmarks',
  };

  return (
    <button
      onClick={() => {
        setValue((value = !value));
      }}
      className={`${bookmark.className} ${bookmark.activeCls} button`}
      type="button">
      <svg className="place-card__bookmark-icon" width={bookmark.width} height={bookmark.height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{bookmark.text}</span>
    </button>
  );
}

export default Bookmark;
