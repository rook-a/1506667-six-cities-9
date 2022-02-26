import cn from 'classnames';

interface BookmarkProps {
  isSmall: boolean;
  className: string;
  isFavorite: boolean;
}

function Bookmark({ isSmall, className, isFavorite }: BookmarkProps): JSX.Element {
  const bookmark = {
    width: isSmall ? 18 : 31,
    height: isSmall ? 19 : 33,
  };

  return (
    <button
      className={cn('button', `${className}`, { 'place-card__bookmark-button--active': isFavorite })}
      type="button">
      <svg className="place-card__bookmark-icon" width={bookmark.width} height={bookmark.height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default Bookmark;
