import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';

function Login(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header isLogged />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
