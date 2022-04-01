import { StyleSheet } from "react-native";
import { appStyles } from "../appStyles/appStyles";

export const navigationStyles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black',
  },
  iconStyle: {tintColor: appStyles.color.tint, width: 30, height: 30},
});