interface LogoProps {
  isFooter: boolean;
}

function Logo({isFooter}: LogoProps): JSX.Element {
  const logo = {
    width: isFooter ? 64 : 81,
    height: isFooter ? 33 : 41,
    nameLink: isFooter ? 'footer__logo-link' : 'header__logo-link',
    nameImage: isFooter ? 'footer__logo' : 'header__logo',
  };

  return (
    <a className={logo.nameLink} href="/">
      <img className={logo.nameImage} src="img/logo.svg" alt="6 cities logo" width={logo.width} height={logo.height} />
    </a>
  );
}

export default Logo;
