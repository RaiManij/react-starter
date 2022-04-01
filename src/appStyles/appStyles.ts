import { StyleSheet } from 'react-native';

export const appStyles = {
  color: {
    main: '#5ea23a',
    text: '#696969',
    title: '#464646',
    subtitle: '#545454',
    categoryTitle: '#161616',
    tint: '#ff5a66',
    description: '#bbbbbb',
    filterTitle: '#8a8a8a',
    starRating: '#2bdf85',
    location: '#a9a9a9',
    white: 'white',
    facebook: '#4267b2',
    grey: 'grey',
    greenBlue: '#00aea8',
    placeholder: '#a0a0a0',
    background: '#f2f2f2',
    blue: '#3293fe',
  },
  fontSize: {
    title: 30,
    content: 20,
    normal: 16,
  },
  buttonWidth: {
    main: '70%',
  },
  textInputWidth: {
    main: '80%',
  },
  borderRadius: {
    main: 25,
    small: 5,
  },
};

export const appIcon = {
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    marginRight: 10,
  },
  style: {
    tintColor: appStyles.color.tint,
    width: 25,
    height: 25,
  },
  images: {
    home: require('../../assets/icons/home.png'),
    defaultUser: require('../../assets/icons/default_user.jpg'),
    logout: require('../../assets/icons/shutdown.png'),
    menu: require('../../assets/icons/menu.png'),
  },
};

export const headerButtonStyle = StyleSheet.create({
  multi: {
    flexDirection: 'row',
  },
  container: {
    padding: 10,
  },
  image: {
    justifyContent: 'center',
    width: 35,
    height: 35,
    margin: 6,
  },
  rightButton: {
    color: appStyles.color.tint,
    marginRight: 10,
    fontWeight: 'normal',
  },
});

export const ListStyle = StyleSheet.create({
  title: {
    fontSize: 16,
    color: appStyles.color.subtitle,
    fontWeight: 'bold',
  },
  subtitleView: {
    minHeight: 55,
    flexDirection: 'row',
    paddingTop: 5,
    marginLeft: 10,
  },
  leftSubtitle: {
    flex: 2,
  },
  avatarStyle: {
    height: 80,
    width: 80,
  },
});
