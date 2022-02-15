import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

interface PrivateRouteProp {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProp): JSX.Element {
  const hasAccess = false;

  return hasAccess ? children : <Navigate to={AppRoute.LOGIN} />;
}

export default PrivateRoute;
