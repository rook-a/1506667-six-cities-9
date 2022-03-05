import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import PrivateOutlet from '../private-outlet/private-outlet';

import { useAppSelector } from '../../hooks';

import { State } from '../../types/store';
import { AppRoute, AuthorizationStatus } from '../../const';

function App(): JSX.Element {
  const { offers, reviews } = useAppSelector((state: State) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage offers={offers} />} />
        <Route element={<PrivateOutlet authorizationStatus={AuthorizationStatus.AUTH} />}>
          <Route path={AppRoute.FAVORITES} element={<Favorites offers={offers} />} />
        </Route>
        <Route
          path={`${AppRoute.PROPERTY}/:id`}
          element={<Property isAuth={true} offers={offers} reviews={reviews} />}
        />
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route path={AppRoute.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
