import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/reducers';
import AppNavigator from './src/navigations/AppNavigation';

function StarterApp() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

AppRegistry.registerComponent('rn_starter_kit', () => StarterApp);

export default StarterApp;
