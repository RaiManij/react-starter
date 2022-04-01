import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import React from 'react';
import DrawerContainer from '../components/DrawerContainer';
import TabNavigator from './BottomTabNavigator';

// drawer stack
const Drawer = createDrawerNavigator();
const DrawerStack = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: {width: 200},
      drawerPosition: 'left',
      headerShown: false,
    }}
    drawerContent={({
      navigation,
      state,
      descriptors,
    }: DrawerContentComponentProps) => (
      <DrawerContainer
        navigation={navigation}
        state={state}
        descriptors={descriptors}
      />
    )}>
    <Drawer.Screen name="Tab" component={TabNavigator} />
  </Drawer.Navigator>
);

export default DrawerStack;
