import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/header';

import styles from './not-found.module.css';
import OopsImg from '../not-found/img/oops.svg';

function NotFound(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="page page--gray">
      <Header isLogged={false} />

      <main>
        <section className={`${styles['page__error']} error`}>
          <img className={styles['error__img']} src={OopsImg} alt="Sad emoji" width={200} height={200} />
          <h1 className={styles['error__title']}>Oops...</h1>
          <p className={styles['error__text']}>That page can&#39;t be found</p>

          <div className={styles['error__buttons']}>
            <button
              className="locations__item-link tabs__item--active button"
              onClick={() => navigate('/', { replace: true })}>
              Back to main page
            </button>
            <button className="locations__item-link tabs__item--active button" onClick={() => navigate(-1)}>
              Go back
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NotFound;
