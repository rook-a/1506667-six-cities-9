import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import Favorites from '../../pages/favorites/favorites';
import Propepty from '../../pages/property/property';
import Login from '../../pages/login/login';

import { AppRoute } from '../../const';

interface AppProps {
  numberOfPlaces: number;
}

function App({ numberOfPlaces }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage numberOfPlaces={numberOfPlaces} isEmpty={false} />} />
        <Route path={AppRoute.Favorites} element={<Favorites isEmpty={false} />} />
        <Route path={AppRoute.Property} element={<Propepty isAuth={false} />} />
        <Route path={AppRoute.Login} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
