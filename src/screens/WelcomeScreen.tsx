import React, {useEffect, useState} from 'react';
import Button from 'react-native-button';
import { PasswordRealmResponse,AuthorizeParams,Credentials, Auth0User, UserInfo, RefreshTokenResponse } from 'react-native-auth0';
import jwt_decode from "jwt-decode";
import {ActivityIndicator, Text, View, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../reducers/hook';
import {login} from '../reducers';
import {AppStyles} from '../AppStyles';
import { auth0 } from '../common/common';
import { LoginStackScreenProps } from '../types/NavigationTypes';
import SessionManager from '../types/SessionManager';
import OAuthResponse from '../types/OAuthResponse';
import { handleLoginResponse } from './LoginScreen';


function WelcomeScreen({navigation}:LoginStackScreenProps<'Welcome'>) {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    tryToLoginFirst();
  }, []);

  const verifyAccessToken = (expiresIn:string,loggedInTime:string) =>{
    let expiresInNumber:number = parseInt(expiresIn);
    let loggedInTimeNumber:number = parseInt(loggedInTime);
    let currentTimeStamp:number = new Date().getTime();
    if(currentTimeStamp > (loggedInTimeNumber + expiresInNumber)){
      return true;
    }
    return false;
  }

  async function tryToLoginFirst() {
    const accessToken = await AsyncStorage.getItem('@loggedInAccessToken:accessToken');
    const refreshToken = await AsyncStorage.getItem('@loggedInRefreshToken:refreshToken');
    const email = await AsyncStorage.getItem('@loggedInUserID:email');
    const idToken = await AsyncStorage.getItem('@loggedInUserID:idToken');
    const loggedInTimeStamp = await AsyncStorage.getItem('@loggedInDateTimestamp:DateTimeStamp');
    const expiresIn = await AsyncStorage.getItem('@loggedInUserID:expiresIn');
    setIsLoading(true);
    if (
      email != null &&
      email.length > 0 
    ) {
      if(verifyAccessToken(expiresIn!,loggedInTimeStamp!)){
        auth0.auth.userInfo({token: accessToken!})
        .then(() => {
          const user = jwt_decode<UserInfo>(idToken!);
          let oAuthResponse:OAuthResponse = new OAuthResponse(idToken!,accessToken!);
          oAuthResponse.setRefreshToken(refreshToken!);
          oAuthResponse.setExpiry(expiresIn!);
          let sessionManager:SessionManager = new SessionManager(user,oAuthResponse);
          dispatch(login(sessionManager));
          navigation.navigate('DrawerStack');
        })
        .catch((error) => {
          const {code, message} = error;
          setIsLoading(false);
          Alert.alert(message);
        }).finally(()=>{
          setIsLoading(false);
        });
      }else{
        auth0.auth.refreshToken({refreshToken:refreshToken!}).then(function(value:RefreshTokenResponse){
          let sessionManager = handleLoginResponse(value);
          dispatch(login(sessionManager!));
          navigation.navigate('DrawerStack');
        }).catch((error) => {
          const {code, message} = error;
          setIsLoading(false);
          Alert.alert(message);
        }).finally(()=>{
          setIsLoading(false);
        });;
      }
      return;
    }else{
      setIsLoading(false);
    }
    
  }

  if (isLoading == true) {
    return (
      <ActivityIndicator
        style={styles.spinner}
        size="large"
        color={AppStyles.color.tint}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Say hello to your new app</Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => navigation.navigate('Login')}>
        Log In
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => navigation.navigate('Signup')}>
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  signupContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.white,
    borderRadius: AppStyles.borderRadius.main,
    padding: 8,
    borderWidth: 1,
    borderColor: AppStyles.color.tint,
    marginTop: 15,
  },
  signupText: {
    color: AppStyles.color.tint,
  },
  spinner: {
    marginTop: 200,
  },
});

export default WelcomeScreen;
