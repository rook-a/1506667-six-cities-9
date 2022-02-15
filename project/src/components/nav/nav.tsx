import { Link } from 'react-router-dom';
import cn from 'classnames';

interface NavProps {
  isAuth?: boolean;
}

function Nav({ isAuth }: NavProps): JSX.Element {
  const link = cn({
    '/favorites': isAuth,
    '/login': !isAuth,
  });
  const titleLink = cn({
    Favorites: isAuth,
    'Sigh in': !isAuth,
  });

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={link} title={titleLink}>
            <div className="header__avatar-wrapper user__avatar-wrapper" />
            {isAuth ? (
              <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
            ) : (
              <span className="header__login">Sign in</span>
            )}
          </Link>
        </li>
        {isAuth && (
          <li className="header__nav-item">
            <Link className="header__nav-link" to="/" title="Sign out">
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
