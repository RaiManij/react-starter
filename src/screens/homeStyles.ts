import { StyleSheet } from "react-native";
import { appStyles } from "../appStyles/appStyles";
import { configuration } from "../configurations/configuration";

export const homeStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: configuration.HOME.LISTING_ITEM.offset,
  },
  title: {
    fontWeight: 'bold',
    color: appStyles.color.title,
    fontSize: 25,
  },
  scrollView: {
    display:"flex"
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5,
  },
});