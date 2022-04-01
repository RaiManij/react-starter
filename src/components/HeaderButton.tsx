import React from 'react';
import {
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  ImageSourcePropType,
} from 'react-native';
import {appIcon} from '../appStyles/appStyles';

interface HeaderButtonProps {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  icon: ImageSourcePropType;
}

export const HeaderButton = (props: HeaderButtonProps) => {
  return (
    <TouchableOpacity style={appIcon.container} onPress={props.onPress}>
      <Image style={appIcon.style} source={props.icon} />
    </TouchableOpacity>
  );
};
