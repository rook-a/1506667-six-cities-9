import { Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import Login from '../../pages/login/login';
import NotFound from '../../pages/not-found/not-found';
import PrivateOutlet from '../private-outlet/private-outlet';
import Spinner from '../spinner/spinner';

import { useAppSelector } from '../../hooks';
import { selectRequireAuthrization } from '../../store/user-slice/user-slice';

import { AppRoute } from '../../utils/const';
import { isCheckedAuth } from '../../utils/utils';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(selectRequireAuthrization);

  if (isCheckedAuth(authorizationStatus)) {
    return <Spinner className="loader" />;
  }

  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route element={<PrivateOutlet authorizationStatus={authorizationStatus} />}>
        <Route path={AppRoute.Favorites} element={<Favorites />} />
      </Route>
      <Route path={`${AppRoute.Property}/:id`} element={<Property />} />
      <Route path={AppRoute.Login} element={<Login />} />
      <Route path={AppRoute.NotFound} element={<NotFound />} />
    </Routes>
  );
}

export default App;
