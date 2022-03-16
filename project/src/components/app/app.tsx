import { Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import PrivateOutlet from '../private-outlet/private-outlet';
import Spinner from '../spinner/spinner';
import HistoryRouter from '../history-route/history-route';
import { browserHistory } from '../../browser-history';

import { useAppSelector } from '../../hooks';
import { selectRequireAuthrization } from '../../store/user-slice/user-slice';
import { selectOffers } from '../../store/offers-slice/offers-slice';

import { AppRoute } from '../../utils/const';
import { isCheckedAuth } from '../../utils/utils';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(selectRequireAuthrization);
  const offers = useAppSelector(selectOffers);

  if (isCheckedAuth(authorizationStatus)) {
    return <Spinner className="loader" />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route index element={<MainPage offers={offers} />} />
        <Route element={<PrivateOutlet authorizationStatus={authorizationStatus} />}>
          <Route path={AppRoute.Favorites} element={<Favorites offers={offers} />} />
        </Route>
        <Route path={`${AppRoute.Property}/:id`} element={<Property />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
