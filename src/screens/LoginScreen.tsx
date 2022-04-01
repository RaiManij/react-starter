import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import Button from 'react-native-button';
import {appStyles} from '../appStyles/appStyles';

import {LoginStackScreenProps} from '../types/NavigationTypes';
import Connection from '../types/Connection';
import OAuthService from '../services/oauth.service';
import {configuration} from '../configurations/configuration';
import {loginStyles} from './loginStyles';
import {useAppDispatch} from '../reducers/hook';
import {LoginState, login} from '../reducers/reducer';

const LoginScreen = ({navigation}: LoginStackScreenProps<'Home'>) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [connections, setConnections] = useState<Connection[]>(
    [] as Connection[],
  );

  useEffect(() => {
    setLoading(true);
    OAuthService.getClientConnections(
      configuration.CONNECTIONURL,
      (connectionList: Connection[]) => {
        if (connectionList.length > 0) {
          setConnections(
            connectionList.reduce(function (
              filtered: Connection[],
              connection,
            ) {
              if (!connection.passwordPolicy) {
                filtered.push(connection);
              }
              return filtered;
            },
            []),
          );
        } else {
        }
        setLoading(false);
      },
    );
  }, []);

  const onPressLogin = () => {
    if (email.length <= 0 || password.length <= 0) {
      Alert.alert('Please fill out the required fields.');
      return;
    }
    setLoading(true);
    OAuthService.authenticatePassword(
      {
        username: email,
        password: password,
        realm: 'Username-Password-Authentication',
      },
      (state: LoginState) => {
        dispatch(login(state));
        navigation.navigate('DrawerStack');
      },
      (error: Error) => {
        const {message} = error;
        Alert.alert(message);
      },
    );
  };

  const onPressConnection = (connection: string) => {
    setLoading(true);
    OAuthService.authenticateCustomConnection(
      connection,
      (state: LoginState) => {
        setLoading(false);
        dispatch(login(state));
        navigation.navigate('DrawerStack');
      },
      (error: Error) => {
        const {message} = error;
        Alert.alert(message);
      },
    );
  };

  return (
    <View style={loginStyles.container}>
      <Text style={[loginStyles.title, loginStyles.leftTitle]}>Sign In</Text>
      <View style={loginStyles.InputContainer}>
        <TextInput
          style={loginStyles.body}
          placeholder="E-mail or UserName"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor={appStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={loginStyles.InputContainer}>
        <TextInput
          style={loginStyles.body}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          placeholderTextColor={appStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button
        containerStyle={loginStyles.loginContainer}
        style={loginStyles.loginText}
        onPress={() => onPressLogin()}>
        Log in
      </Button>
      <Text style={loginStyles.or}>OR</Text>

      {loading ? (
        <ActivityIndicator
          style={{marginTop: 30}}
          size="large"
          animating={loading}
          color={appStyles.color.tint}
        />
      ) : (
        connections.map((connection, index) => (
          <Button
            containerStyle={loginStyles.loginContainer}
            style={loginStyles.loginText}
            onPress={() => {
              onPressConnection(connection.name);
            }}
            key={connection.name}>
            Login with {connection.name}
          </Button>
        ))
      )}
    </View>
  );
};

export default LoginScreen;
