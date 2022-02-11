import Logo from '../logo/logo';
import Nav from '../nav/nav';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">

            <Logo />

          </div>

          <Nav />

        </div>
      </div>
    </header>
  );
}

export default Header;
