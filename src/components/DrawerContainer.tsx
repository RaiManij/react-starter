import React from 'react';
import {Alert, View} from 'react-native';
import MenuButton from '../components/MenuButton';
import {appIcon} from '../appStyles/appStyles';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import OAuthService from '../services/oauth.service';
import {RootState} from '../reducers';
import {useAppDispatch, useAppSelector} from '../reducers/hook';
import {logout} from '../reducers/reducer';
import {drawerStyles} from './drawerStyles';

const DrawerContainer = ({navigation}: DrawerContentComponentProps) => {
  const dispatch = useAppDispatch();
  const oauthVariable = useAppSelector(
    (state: RootState) => state.oAuthResponse,
  );
  const logoutSession = async () => {
    OAuthService.oAuthLogout(
      oauthVariable?.refreshToken,
      () => {
        dispatch(logout());
        navigation.navigate('LoginStack');
      },
      (error: Error) => {
        const {message} = error;
        Alert.alert(message);
      },
    );
  };

  return (
    <View style={drawerStyles.content}>
      <View style={drawerStyles.container}>
        <MenuButton
          title="LOG OUT"
          source={appIcon.images.logout}
          onPress={() => {
            logoutSession();
          }}
        />
      </View>
    </View>
  );
};

export default DrawerContainer;
