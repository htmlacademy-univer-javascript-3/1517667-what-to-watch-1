import { Navigate } from 'react-router-dom';

export enum AuthorizationStatus {
  Auth,
  NoAuth
}

type PrivateRouteProps = {
  authStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PrivateRoute(props: PrivateRouteProps) : JSX.Element {
  const { authStatus, children } = props;

  return (authStatus === AuthorizationStatus.Auth ? children : <Navigate to='/' /> );
}
