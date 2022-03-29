import React, {useEffect, useState} from 'react';
import { PasswordRealmResponse,AuthorizeParams,Credentials, UserInfo, RefreshTokenResponse } from 'react-native-auth0';
import { auth0 } from '../common/common';
import jwt_decode from "jwt-decode";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';
import {AppStyles} from '../AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../reducers/hook';
import {login} from '../reducers';
import { LoginStackScreenProps } from '../types/NavigationTypes';
import SessionManager from '../types/SessionManager';
import HttpService from "../services/http.service"
import Connection from '../types/Connection';
import OAuthResponse from '../types/OAuthResponse';

export const handleLoginResponse  = (response:Credentials | PasswordRealmResponse | RefreshTokenResponse)=>{
  const accessToken = response.accessToken;
  const idToken = response.idToken;
  const refreshToken = response.refreshToken;
  const expiresIn = response.expiresIn;
  const type = response.tokenType;
  const user = jwt_decode<UserInfo>(idToken);
    if (accessToken) {
      AsyncStorage.setItem('@loggedInAccessToken:accessToken', accessToken);
      if(refreshToken){
        AsyncStorage.setItem('@loggedInRefreshToken:refreshToken', refreshToken);
      }
      AsyncStorage.setItem('@loggedInUserID:email', user.email);
      AsyncStorage.setItem('@loggedInDateTimestamp:DateTimeStamp', new Date().getTime().toString());
      AsyncStorage.setItem('@loggedInUserID:idToken', idToken);
      AsyncStorage.setItem('@loggedInUserID:expiresIn', expiresIn.toString());
      let oAuthResponse:OAuthResponse = new OAuthResponse(idToken!,accessToken!);
      oAuthResponse.setRefreshToken(refreshToken!);
      oAuthResponse.setExpiry(expiresIn!.toString());
      let sessionManager:SessionManager = new SessionManager(user,oAuthResponse);
      return sessionManager;
    } else {
      Alert.alert('User does not exist. Please try again.');
    }
  return null;
}

function LoginScreen({navigation}:LoginStackScreenProps<'Login'>) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connections, setConnections] = useState<Connection[]>(
    [] as Connection[]);
  
  console.log("LoginScreen is loading.....");
  const dispatch = useAppDispatch();

  useEffect(() => {
    let connectionUrl = "connections";
    let httpsUrl = "https://dev-cxxb7ck9.us.auth0.com";
    let httpObject:HttpService = new HttpService(httpsUrl + "/api/v2/");
    setLoading(true);
    let clientConnectionUrl = "https://cdn.us.auth0.com/client/ewj9rQJRkBxQq7VRKH1EpSbwpW29vGF4.js";
    httpObject.getClientConnections(clientConnectionUrl,function(connectionList:Connection[]){
      console.log(connectionList);
      let filteredConnectionList:Connection[] = [];
      if(connectionList.length > 0){
        connectionList.forEach(function(con,value){
            if(!con.passwordPolicy){
              filteredConnectionList.push(con);
            }
        })
        setConnections(filteredConnectionList);
      }else{
        console.log("No connections present..");
      }
      setLoading(false);
    })
  }, []);


  const onPressLogin = () => {
    if (email.length <= 0 || password.length <= 0) {
      Alert.alert('Please fill out the required fields.');
      return;
    }
    auth0.auth.passwordRealm({
      username: email,
      password: password,
      realm: 'Username-Password-Authentication',
    }).then((response:PasswordRealmResponse) => {
       let sessionManager = handleLoginResponse(response);
       dispatch(login(sessionManager!));
       navigation.navigate('DrawerStack');
      })
      .catch((error) => {
        const {message} = error;
        Alert.alert(message);
      });
  };


  const onPressConnection = (connection:string) => {
    if(loading){
      return;
    }
    setLoading(true);
    console.log(connection);
    const authorizeParam:AuthorizeParams = {
      state:"1234",
      connection:connection,
      prompt:"login",
      max_age:0,
      scope:"openid profile email offline_access",
      audience:"https://dev-cxxb7ck9.us.auth0.com/userinfo"
    };
    auth0.webAuth.authorize(authorizeParam)
      .then((data:Credentials) => {
        let sessionManager = handleLoginResponse(data);
        dispatch(login(sessionManager!));
        setLoading(false);
        navigation.navigate('DrawerStack');
      })
      .catch((error) => {
        const {message} = error;
        setLoading(false);
        Alert.alert(message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail or phone number"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => onPressLogin()}>
        Log in
      </Button>
      <Text style={styles.or}>OR</Text>

      {loading ? (
        <ActivityIndicator
          style={{marginTop: 30}}
          size="large"
          animating={loading}
          color={AppStyles.color.tint}
        />
      ) : (
        connections.map((connection, index) => (

                <Button containerStyle={styles.loginContainer}
                style={styles.loginText}
                onPress={()=>{onPressConnection(connection.name);}}
                  key={connection.name}>
                  Login with {connection.name}
                </Button>
        ))
        
      )}
    </View>
  );
}

         
          
       
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  or: {
    color: 'black',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
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
  placeholder: {
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  facebookContainer: {
    width: 192,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
  googleContainer: {
    width: 192,
    height: 48,
    marginTop: 30,
  },
  googleText: {
    color: AppStyles.color.white,
  },
});

export default LoginScreen;
