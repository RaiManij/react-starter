import React, {useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {CreateUserResponse} from 'react-native-auth0';
import Button from 'react-native-button';
import {appStyles} from '../appStyles/appStyles';
import oauthService from '../services/oauth.service';
import {LoginStackScreenProps} from '../types/NavigationTypes';
import {signUpStyles} from './SignupStyles';

const SignupScreen = ({navigation}: LoginStackScreenProps<'Signup'>) => {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const onRegister = () => {
    const data = {
      email: email,
      password: password,
      username: userName,
      connection: 'Username-Password-Authentication',
      metadata: {
        fullname: fullname,
        phone: phone,
      },
    };
    oauthService.createUser(
      data,
      (response: CreateUserResponse) => {
        if (response.Id && response.email) {
          navigation.navigate('Login');
        } else {
          Alert.alert('Error creating user..');
        }
      },
      (error: Error) => {
        const {message} = error;
        Alert.alert(message);
      },
    );
  };

  return (
    <View style={signUpStyles.container}>
      <Text style={[signUpStyles.title, signUpStyles.leftTitle]}>
        Create new account
      </Text>
      <View style={signUpStyles.InputContainer}>
        <TextInput
          style={signUpStyles.body}
          placeholder="Full Name"
          onChangeText={setFullname}
          value={fullname}
          placeholderTextColor={appStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={signUpStyles.InputContainer}>
        <TextInput
          style={signUpStyles.body}
          placeholder="Phone Number"
          onChangeText={setPhone}
          value={phone}
          placeholderTextColor={appStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={signUpStyles.InputContainer}>
        <TextInput
          style={signUpStyles.body}
          placeholder="E-mail Address"
          onChangeText={setEmail}
          value={email}
          placeholderTextColor={appStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={signUpStyles.InputContainer}>
        <TextInput
          style={signUpStyles.body}
          placeholder="UserName"
          onChangeText={setUserName}
          value={email}
          placeholderTextColor={appStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={signUpStyles.InputContainer}>
        <TextInput
          style={signUpStyles.body}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholderTextColor={appStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button
        containerStyle={[signUpStyles.signUpButtonContainer, {marginTop: 50}]}
        style={signUpStyles.signUpText}
        onPress={() => onRegister()}>
        Sign Up
      </Button>
    </View>
  );
};

export default SignupScreen;
