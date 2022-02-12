import Logo from '../logo/logo';
import Nav from '../nav/nav';

interface HeaderProps {
  isAuth?: boolean;
  isLogged?: boolean;
}

function Header({isAuth, isLogged}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo isFooter={false} />
          </div>

          {!isLogged ? <Nav isAuth={isAuth} /> : ''}
        </div>
      </div>
    </header>
  );
}

export default Header;
