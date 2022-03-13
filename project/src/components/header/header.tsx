import Logo from '../logo/logo';
import Nav from '../nav/nav';

interface HeaderProps {
  isAuth?: boolean;
  isLoginPage?: boolean;
}

function Header({ isAuth, isLoginPage }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo isFooter={false} />
          </div>

          {!isLoginPage ? <Nav isAuth={isAuth} /> : ''}
        </div>
      </div>
    </header>
  );
}

export default Header;
