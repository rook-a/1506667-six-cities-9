import { useNavigate } from 'react-router-dom';
import styles from './not-found.module.css';
import Header from '../../components/header/header';

function NotFound(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="page page--gray">
      <Header isLogged={false} />

      <main className={`${styles.page__error} error`}>
        <section>
          <img className={`${styles.error__img}`} src="img/oops.svg" alt="Sad emoji" width={200} height={200} />
          <h1 className={`${styles.error__title}`}>Oops...</h1>
          <p className={`${styles.error__text}`}>That page can&#39;t be found</p>

          <div className={`${styles.error__buttons}`}>
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
