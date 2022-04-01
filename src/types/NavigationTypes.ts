import type {StackScreenProps} from '@react-navigation/stack';
export type LoginStackParameterList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  LoginStack: undefined;
  DrawerStack: undefined;
};

export type LoginStackScreenProps<T extends keyof LoginStackParameterList> =
  StackScreenProps<LoginStackParameterList, T>;


declare global {
  namespace ReactNavigation {
    interface RootParamList extends LoginStackParameterList {}
  }
}
