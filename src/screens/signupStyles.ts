
import { StyleSheet } from "react-native";
import { appStyles } from "../appStyles/appStyles";

export const signUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: appStyles.fontSize.title,
    fontWeight: 'bold',
    color: appStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: appStyles.fontSize.content,
    color: appStyles.color.text,
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
  placeholder: {
    color: 'red',
  },
  InputContainer: {
    width: appStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: appStyles.color.grey,
    borderRadius: appStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: appStyles.color.text,
  },
  signUpButtonContainer: {
    width: appStyles.buttonWidth.main,
    backgroundColor: appStyles.color.tint,
    borderRadius: appStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  signUpText: {
    color: appStyles.color.white,
  },
});
