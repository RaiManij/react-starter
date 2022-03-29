export default class OAuthResponse {
  idToken: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn: string = '';
  constructor(idToken: string, accessToken: string) {
    this.idToken = idToken;
    this.accessToken = accessToken;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
  setExpiry(expiresIn: string) {
    this.expiresIn = expiresIn;
  }
}
