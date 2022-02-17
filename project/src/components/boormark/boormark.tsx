interface BookmarkProps {
  isSmall: boolean;
  isActive: boolean;
}

function Bookmark({ isSmall, isActive }: BookmarkProps): JSX.Element {
  const bookmark = {
    width: isSmall ? 18 : 31,
    height: isSmall ? 19 : 33,
    className: isSmall ? 'place-card__bookmark-button' : 'property__bookmark-button',
    activeCls: isActive ? 'place-card__bookmark-button--active' : '',
    text: isActive ? 'In bookmarks' : 'To bookmarks',
  };

  return (
    <button className={`${bookmark.className} ${bookmark.activeCls} button`} type="button">
      <svg className="place-card__bookmark-icon" width={bookmark.width} height={bookmark.height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{bookmark.text}</span>
    </button>
  );
}

export default Bookmark;
