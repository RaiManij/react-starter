import React, {useEffect, useState} from 'react';
import Button from 'react-native-button';
import {ActivityIndicator, Text, View, StyleSheet, Alert} from 'react-native';
import {appStyles} from '../appStyles/appStyles';
import {welcomeStyles} from './welcomeStyles';
import {LoginStackScreenProps} from '../types/NavigationTypes';
import {RootState} from '../reducers';
import {useAppDispatch, useAppSelector} from '../reducers/hook';
import {LoginState, login} from '../reducers/reducer';
import OAuthService from '../services/oauth.service';

const WelcomeScreen = ({navigation}: LoginStackScreenProps<'Welcome'>) => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useAppSelector((state: RootState) => state.user);
  const oauthVariable = useAppSelector(
    (state: RootState) => state.oAuthResponse,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user && oauthVariable) {
      setIsLoading(true);
      OAuthService.validateAccessToken(
        oauthVariable,
        user?.email,
        function (isValid: boolean, state: LoginState) {
          if (state) {
            dispatch(login(state));
          }
          if (isValid) {
            navigation.navigate('DrawerStack');
          }
          setIsLoading(false);
        },
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading == true) {
    return (
      <ActivityIndicator
        style={welcomeStyles.spinner}
        size="large"
        color={appStyles.color.tint}
      />
    );
  }
  return (
    <View style={welcomeStyles.container}>
      <Text style={welcomeStyles.title}>Say hello to your new app</Text>
      <Button
        containerStyle={welcomeStyles.loginContainer}
        style={welcomeStyles.loginText}
        onPress={() => navigation.navigate('Login')}>
        Log In
      </Button>
      <Button
        containerStyle={welcomeStyles.signupContainer}
        style={welcomeStyles.signupText}
        onPress={() => navigation.navigate('Signup')}>
        Sign Up
      </Button>
    </View>
  );
};

export default WelcomeScreen;
