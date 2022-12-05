import { AuthorizationStatus } from '../../components/private-route/private-route';
import { State } from '../../types/state';
import { Namespace } from '../../types/Namespace';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[Namespace.AuthInfo].authorizationStatus;
