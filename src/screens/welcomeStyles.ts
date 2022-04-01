import { StyleSheet } from "react-native";
import { appStyles } from "../appStyles/appStyles";

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: appStyles.fontSize.title,
    fontWeight: 'bold',
    color: appStyles.color.tint,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  loginContainer: {
    width: appStyles.buttonWidth.main,
    backgroundColor: appStyles.color.tint,
    borderRadius: appStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: appStyles.color.white,
  },
  signupContainer: {
    width: appStyles.buttonWidth.main,
    backgroundColor: appStyles.color.white,
    borderRadius: appStyles.borderRadius.main,
    padding: 8,
    borderWidth: 1,
    borderColor: appStyles.color.tint,
    marginTop: 15,
  },
  signupText: {
    color: appStyles.color.tint,
  },
  spinner: {
    marginTop: 200,
  },
});