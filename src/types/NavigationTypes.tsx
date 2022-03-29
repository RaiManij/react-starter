import type {
    CompositeScreenProps
  } from '@react-navigation/native';
  import type { StackScreenProps } from '@react-navigation/stack';
  import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/src/types';


  export type LoginStackParameterList = {
    Welcome: undefined;
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    LoginStack:undefined;
    DrawerStack:undefined;
  };
  
  export type LoginStackScreenProps<T extends keyof LoginStackParameterList> =
    StackScreenProps<LoginStackParameterList, T>;
  
  export type HomeTabParamList = {
    Home: undefined;
  };

  
  export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
    CompositeScreenProps<
      BottomTabScreenProps<HomeTabParamList, T>,
      LoginStackScreenProps<keyof LoginStackParameterList>
    >;
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends LoginStackParameterList {}
    }
  }