import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import Favorites from '../../pages/favorites/favorites';
import Propepty from '../../pages/property/property';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';

import PrivateOutlet from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';

interface AppProps {
  numberOfPlaces: number;
}

function App({ numberOfPlaces }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage numberOfPlaces={numberOfPlaces} isEmpty={false} />} />
        <Route path={AppRoute.FAVORITES} element={<PrivateOutlet authorizationStatus={AuthorizationStatus.NO_AUTH} />}>
          <Route path="" element={<Favorites isEmpty={false} />} />
        </Route>
        <Route path={AppRoute.PROPERTY}>
          <Route index element={<Propepty isAuth={false} />} />
          <Route path={AppRoute.PROPERTY_ID} element={<Propepty isAuth={false} />} />
        </Route>
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route path={AppRoute.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
