import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import OAuthResponse from '../types/OAuthResponse';
import {UserInfo} from 'react-native-auth0';

export interface LoginState {
  isLoggedIn: boolean;
  oAuthResponse?: OAuthResponse;
  user?: UserInfo;
  loggedInIimeStamp?:number
}

const initialAuthState: LoginState = {isLoggedIn: false};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state: LoginState, action: PayloadAction<LoginState>) {
      state.isLoggedIn = true;
      state.oAuthResponse = action.payload.oAuthResponse;
      state.user = action.payload.user;
    },
    logout(state: LoginState) {
      state.isLoggedIn = false;
      state.oAuthResponse = undefined;
      state.user = undefined;
    },
  },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;