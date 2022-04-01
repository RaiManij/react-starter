import Auth0, {
  AuthorizeParams,
  CreateUserParams,
  CreateUserResponse,
  Credentials,
  PasswordRealmParams,
  PasswordRealmResponse,
  RefreshTokenResponse,
  UserInfo,
} from 'react-native-auth0';
import {
  REACT_APP_CLIENTID,
  REACT_APP_DOMAINID,
  MANAGEMENT_API_ACCESS_TOKEN,
} from '@env';
import jwt_decode from 'jwt-decode';
import Connection from '../types/Connection';
import {ConnectionMap, ConnectionTypes} from '../types/ConnectionTypes';
import {LoginState} from '../reducers/reducer';
import OAuthResponse from '../types/OAuthResponse';

//
const auth0 = new Auth0({
  domain: REACT_APP_DOMAINID,
  clientId: REACT_APP_CLIENTID,
});

interface OAuthService {
  handleLoginResponse: Function;
  createUser: Function;
  authenticatePassword: Function;
  authenticateCustomConnection: Function;
  getClientConnections: Function;
  validateAccessToken: Function;
  oAuthLogout: Function;
  getUsersList: Function;
}

const verifyAccessToken = (expiresIn: number, loggedInTime: number) => {
  let currentTimeStamp: number = new Date().getTime();
  if (currentTimeStamp < loggedInTime + expiresIn) {
    return true;
  }
  return false;
};

async function validateAccessToken(
  oAuthResponse: OAuthResponse,
  email: string,
  callback: Function,
) {
  const accessToken = oAuthResponse.accessToken;
  const refreshToken = oAuthResponse.refreshToken;
  const loggedInTimeStamp = oAuthResponse.loggedInIimeStamp;
  const expiresIn = oAuthResponse.expiresIn;
  if (email != null && email.length > 0) {
    if (verifyAccessToken(expiresIn!, loggedInTimeStamp!)) {
      auth0.auth
        .userInfo({token: accessToken!})
        .then(() => {
          callback(true);
        })
        .catch((error) => {
          callback(false);
        });
    } else {
      if (refreshToken) {
        auth0.auth
          .refreshToken({refreshToken: refreshToken!})
          .then(function (value: RefreshTokenResponse) {
            let state = handleLoginResponse(value);
            callback(true, state);
          })
          .catch((error) => {
            callback(false);
          });
      } else {
        callback(false);
      }
    }
    return;
  } else {
    callback(false);
  }
}

const handleLoginResponse = (
  response: Credentials | PasswordRealmResponse | RefreshTokenResponse,
) => {
  const accessToken = response.accessToken;
  const idToken = response.idToken;
  const refreshToken = response.refreshToken;
  const expiresIn = response.expiresIn;
  const user = jwt_decode<UserInfo>(idToken);
  if (accessToken) {
    const state: LoginState = {
      oAuthResponse: {
        idToken: idToken,
        accessToken: accessToken,
        expiresIn: expiresIn,
        refreshToken: refreshToken,
        loggedInIimeStamp: new Date().getTime(),
      },
      user: user,
      isLoggedIn: true,
    };
    return state;
  }
  return null;
};

const createUser = (
  user: CreateUserParams<{}>,
  callback: Function,
  errorCallback: Function,
) => {
  auth0.auth
    .createUser(user)
    .then((response: CreateUserResponse) => {
      callback(response);
    })
    .catch((error) => {
      errorCallback(error);
    });
};

const authenticatePassword = (
  userCredentials: PasswordRealmParams,
  callback: Function,
  errorCallback: Function,
) => {
  auth0.auth
    .passwordRealm(userCredentials)
    .then((response: PasswordRealmResponse) => {
      const state = handleLoginResponse(response);
      callback(state);
    })
    .catch((error) => {
      errorCallback(error);
    });
};

const authenticateCustomConnection = (
  connection: string,
  callback: Function,
  errorCallback: Function,
) => {
  const authorizeParam: AuthorizeParams = {
    state: '1234',
    connection: connection,
    prompt: 'login',
    max_age: 0,
    scope: 'openid profile email offline_access',
    audience: 'https://dev-cxxb7ck9.us.auth0.com/userinfo',
  };
  auth0.webAuth
    .authorize(authorizeParam)
    .then((data: Credentials) => {
      const state = handleLoginResponse(data);
      callback(state);
    })
    .catch((error) => {
      errorCallback(error);
    });
};

const getClientConnections = (url: string, callback: Function) => {
  var Auth0 = {
    setClient: function (homeRealm: ConnectionTypes) {
      let connections: Connection[] = [];
      const strategies: ConnectionMap[] = homeRealm.strategies;
      strategies.map((stragegy, index) => {
        connections = connections.concat(stragegy.connections);
      });
      callback(connections);
    },
  };
  return fetch(url)
    .then((r) => r.text())
    .then((script: string) => {
      eval(script);
    })
    .catch((error) => {
      callback([]);
    });
};

const getUsersList = (url: string, callback: Function) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + MANAGEMENT_API_ACCESS_TOKEN,
    },
  })
    .then((r) => r.json())
    .then((data: UserInfo) => {
      callback(data);
    })
    .catch((error) => {
      callback([]);
    });
};

const oAuthLogout = (
  refreshToken: string,
  callback: Function,
  errorCallback: Function,
) => {
  auth0.webAuth
    .clearSession()
    .then(function () {
      if (refreshToken) {
        auth0.auth
          .revoke({refreshToken: refreshToken!})
          .then(function () {
            callback();
          })
          .catch((error) => {
            errorCallback(error);
          });
      } else {
      }
    })
    .catch((error) => {
      errorCallback(error);
    });
};

const oauthService: OAuthService = {
  handleLoginResponse: handleLoginResponse,
  createUser: createUser,
  authenticatePassword: authenticatePassword,
  authenticateCustomConnection: authenticateCustomConnection,
  getClientConnections: getClientConnections,
  validateAccessToken: validateAccessToken,
  oAuthLogout: oAuthLogout,
  getUsersList: getUsersList,
};

export default oauthService;
