import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

interface NavProps {
  isAuth?: boolean;
}

function Nav({ isAuth }: NavProps): JSX.Element {
  const dispatch = useAppDispatch();

  const titleLink = isAuth ? 'Favorites' : 'Sigh in';

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to="/favorites" title={titleLink}>
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
            <Link
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
              className="header__nav-link"
              to="/"
              title="Sign out">
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
