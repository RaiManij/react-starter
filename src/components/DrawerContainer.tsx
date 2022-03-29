import React from 'react';
import { Alert, StyleSheet, View} from 'react-native';
import MenuButton from '../components/MenuButton';
import {AppIcon} from '../AppStyles';
import {useAppDispatch} from '../reducers/hook';
import {logout} from '../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth0 } from '../common/common';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function DrawerContainer({navigation}:  DrawerContentComponentProps) {
  const dispatch = useAppDispatch();

  const clearAsyncStorage =()=>{
    AsyncStorage.clear().then(function(){
      dispatch(logout());
      navigation.navigate('LoginStack');
    }).catch((error) => {
        const {code, message} = error;
        console.log(message);
        console.log(error);
        Alert.alert(message);
        console.log(message);
      });
  }

  const logoutSession = async ()=> {
    const refreshToken = await AsyncStorage.getItem('@loggedInRefreshToken:refreshToken');
    auth0.webAuth.clearSession().then(function(){
      auth0.auth.revoke({refreshToken:refreshToken}).then(function(){
        clearAsyncStorage()
      }).catch((error) => {
        const {code, message} = error;
        Alert.alert(message);
        console.log(message);
      });
    }).catch((error) => {
      const {code, message} = error;
      Alert.alert(message);
      console.log(message);
    });
    
  }

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="LOG OUT"
          source={AppIcon.images.logout}
          onPress={() => {
            logoutSession();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
});
