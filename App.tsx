import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {store, persisedStore} from './src/reducers';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './src/navigations/AppNavigation';

const StarterApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persisedStore}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent('rn_starter_kit', () => StarterApp);

export default StarterApp;
