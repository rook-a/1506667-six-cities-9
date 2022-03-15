import { memo } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  isFooter: boolean;
}

function Logo({ isFooter }: LogoProps): JSX.Element {
  const logo = {
    width: isFooter ? 64 : 81,
    height: isFooter ? 33 : 41,
    nameLink: isFooter ? 'footer__logo-link' : 'header__logo-link',
    nameImage: isFooter ? 'footer__logo' : 'header__logo',
  };

  return (
    <Link className={logo.nameLink} to="/" title="Six cities">
      <img className={logo.nameImage} src="img/logo.svg" alt="6 cities logo" width={logo.width} height={logo.height} />
    </Link>
  );
}

export default memo(Logo, (prevProps, newProps) => prevProps.isFooter === newProps.isFooter);
