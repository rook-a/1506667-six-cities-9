import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/const';

interface PrivateOutletProp {
  authorizationStatus: AuthorizationStatus;
}

function PrivateOutlet({ authorizationStatus }: PrivateOutletProp): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth ? <Outlet /> : <Navigate to={AppRoute.Login} />;
}

export default PrivateOutlet;
