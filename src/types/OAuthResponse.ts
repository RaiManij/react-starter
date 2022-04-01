export default interface OAuthResponse {
  idToken: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  loggedInIimeStamp: number;
}
