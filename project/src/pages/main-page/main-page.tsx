import Tabs from '../../components/tabs/tabs';
import Header from '../../components/header/header';
import EmptyMainPage from './empty-main-page';
import MainContent from '../../components/main-content/main-content';

import { selectRequireAuthrization } from '../../store/user-slice/user-slice';
import { selectCity } from '../../store/app-slice/app-slice';
import { selectCurrentOffers } from '../../store/offers-slice/offers-slice';

import { useAppSelector } from '../../hooks';

import { isAuth } from '../../utils/utils';

function MainPage(): JSX.Element {
  const authorizationStatus = useAppSelector(selectRequireAuthrization);
  const city = useAppSelector(selectCity);
  const currentOffers = useAppSelector(selectCurrentOffers);

  const isEmpty = currentOffers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header isAuth={isAuth(authorizationStatus)} />

      <main className={`page__main page__main--index ${isEmpty && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs city={city} />

        {isEmpty ? <EmptyMainPage /> : <MainContent offers={currentOffers} />}
      </main>
    </div>
  );
}

export default MainPage;
