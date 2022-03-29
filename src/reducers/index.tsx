import {combineReducers, AnyAction} from 'redux';
import SessionManager from '../types/SessionManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import OAuthResponse from '../types/OAuthResponse';
import {UserInfo} from 'react-native-auth0';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

interface CounterState {
  isLoggedIn: boolean;
  oAuthResponse?: OAuthResponse;
  user?: UserInfo;
}

const initialAuthState: CounterState = {isLoggedIn: false};

export const login = (user: SessionManager) => ({
  type: LOGIN,
  user,
});

export const logout = () => ({
  type: LOGOUT,
});

function auth(state = initialAuthState, action: AnyAction): CounterState {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        oAuthResponse: action.user.oAuthResponse,
        isLoggedIn: true,
        user: action.user.userInfo,
      };
    case LOGOUT:
      return {...state, isLoggedIn: false, oAuthResponse: null, user: null};
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  auth,
});

const store = createStore(AppReducer, applyMiddleware(thunk));

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
