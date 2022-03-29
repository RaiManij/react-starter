import { UserInfo } from "react-native-auth0";
import OAuthResponse from "./OAuthResponse";

export default class SessionManager{
    userInfo:UserInfo;
    oauthResponse:OAuthResponse;
    constructor(userInfo:UserInfo,oauthResponse:OAuthResponse){
        this.userInfo = userInfo;
        this.oauthResponse = oauthResponse;
    }
}