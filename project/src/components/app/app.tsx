import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';

import PrivateOutlet from '../private-outlet/private-outlet';
import { AppRoute, AuthorizationStatus } from '../../const';

interface AppProps {
  numberOfPlaces: number;
}

function App({ numberOfPlaces }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage numberOfPlaces={numberOfPlaces} />} />
        <Route element={<PrivateOutlet authorizationStatus={AuthorizationStatus.NO_AUTH} />}>
          <Route path={AppRoute.FAVORITES} element={<Favorites isEmpty={false} />} />
        </Route>
        <Route path={AppRoute.PROPERTY}>
          <Route index element={<Property isAuth={false} />} />
          <Route path={`${AppRoute.PROPERTY}/:id`} element={<Property isAuth={false} />} />
        </Route>
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route path={AppRoute.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
