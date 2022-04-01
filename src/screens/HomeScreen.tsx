import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ScrollView, Text, FlatList, ListRenderItem, View} from 'react-native';
import {RootState} from '../reducers';
import {useAppSelector} from '../reducers/hook';
import {LoginStackScreenProps} from '../types/NavigationTypes';
import {homeStyles} from './homeStyles';
import OAuthService from '../services/oauth.service';
import {UserInfo} from 'react-native-auth0';
import MenuButton from '../components/MenuButton';
import {configuration} from '../configurations/configuration';

const HomeScreen = ({navigation}: LoginStackScreenProps<'Home'>) => {
  const user = useAppSelector((state: RootState) => state.user);
  const oAuthResponse = useAppSelector(
    (state: RootState) => state.oAuthResponse,
  );
  const [users, setUsers] = useState<UserInfo[]>([] as UserInfo[]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
    });
  }, []);

  const renderItem: ListRenderItem<UserInfo> = ({item}) => (
    <MenuButton title={item.name} source={{uri: item.picture}}></MenuButton>
  );

  useEffect(() => {
    if (oAuthResponse) {
      OAuthService.getUsersList(
        configuration.AUTH0_APIURL + 'users',
        (userList: UserInfo[]) => {
          setUsers(userList);
        },
      );
    }
  }, []);

  return (
    <View style={homeStyles.container}>
      <ScrollView style={homeStyles.scrollView}>
        <Text style={homeStyles.title}>Welcome {user?.name ?? 'User'}</Text>
      </ScrollView>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.email}
      />
    </View>
  );
};

export default HomeScreen;
