import Auth0 from 'react-native-auth0';
import {REACT_APP_SOCKET_CLIENTID, REACT_APP_SOCKET_DOMAINID} from '@env';

export const auth0 = new Auth0({
  domain: REACT_APP_SOCKET_DOMAINID,
  clientId: REACT_APP_SOCKET_CLIENTID,
});
