import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/const';

interface PrivateOutletProp {
  authorizationStatus: AuthorizationStatus;
}

function PrivateOutlet({ authorizationStatus }: PrivateOutletProp): JSX.Element {
  return authorizationStatus === AuthorizationStatus.AUTH ? <Outlet /> : <Navigate to={AppRoute.LOGIN} />;
}

export default PrivateOutlet;
