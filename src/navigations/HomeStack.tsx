import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image, Pressable} from 'react-native';
import {appIcon} from '../appStyles/appStyles';
import HomeScreen from '../screens/HomeScreen';
import {LoginStackParameterList} from '../types/NavigationTypes';
import {navigationStyles} from './navigationStyles';

export const Stack = createStackNavigator<LoginStackParameterList>();
export const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: 'red',
      headerTitleStyle: navigationStyles.headerTitleStyle,
      headerMode: 'float',
    }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({navigation}) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image
              style={navigationStyles.iconStyle}
              source={appIcon.images.menu}
            />
          </Pressable>
        ),
        headerLeftContainerStyle: {paddingLeft: 10},
      })}
    />
  </Stack.Navigator>
);
