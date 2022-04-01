import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {menuStyles} from './menuStyles';

interface MenuProps {
  onPress?: (event: GestureResponderEvent) => void;
  source: ImageSourcePropType;
  title: string;
}

function MenuButton(props: MenuProps) {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={menuStyles.btnClickContain}
      underlayColor="rgba(128, 128, 128, 0.1)">
      <View style={menuStyles.btnContainer}>
        <Image source={props.source} style={menuStyles.btnIcon} />
        <Text style={menuStyles.btnText}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default MenuButton;
