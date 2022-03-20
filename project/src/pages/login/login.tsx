import { Link } from 'react-router-dom';

import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';

import { useAppDispatch } from '../../hooks';
import { currentCity } from '../../store/app-slice/app-slice';
import { redirectToRoute } from '../../store/action';

import { getRandomNumber } from '../../utils/utils';
import { AppRoute, CITIES } from '../../utils/const';

const MIN_INDEX = 0;
const index = getRandomNumber(MIN_INDEX, CITIES.length - 1);
const city = CITIES[index];

function Login(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--login">
      <Header isLoginPage />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(currentCity(city));

                  dispatch(redirectToRoute(AppRoute.Main));
                }}
                className="locations__item-link"
                to="/">
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
