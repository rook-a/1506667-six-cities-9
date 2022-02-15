import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

interface PrivateRouteProp {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(prop: PrivateRouteProp): JSX.Element {
  const { authorizationStatus, children } = prop;

  return authorizationStatus === AuthorizationStatus.AUTH ? children : <Navigate to={AppRoute.LOGIN} />;
}

export default PrivateRoute;
