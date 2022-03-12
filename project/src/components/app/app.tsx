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

import { State } from '../../types/state';
import { AppRoute } from '../../utils/const';
import { isCheckedAuth, isCheckPending } from '../../utils/utils';

function App(): JSX.Element {
  const { offers, authorizationStatus, offersStatus } = useAppSelector((state: State) => state);

  if (isCheckedAuth(authorizationStatus) || isCheckPending(offersStatus)) {
    return <Spinner />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route index element={<MainPage offers={offers} />} />
        <Route element={<PrivateOutlet authorizationStatus={authorizationStatus} />}>
          <Route path={AppRoute.FAVORITES} element={<Favorites offers={offers} />} />
        </Route>
        <Route path={`${AppRoute.PROPERTY}/:id`} element={<Property />} />
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route path={AppRoute.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
