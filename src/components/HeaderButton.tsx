import React from 'react';
import {TouchableOpacity, Image, GestureResponderEvent, ImageSourcePropType} from 'react-native';
import {AppIcon} from '../AppStyles';

export default function HeaderButton(props: { onPress: ((event: GestureResponderEvent) => void) | undefined; icon: ImageSourcePropType; }) {
  return (
    <TouchableOpacity style={AppIcon.container} onPress={props.onPress}>
      <Image style={AppIcon.style} source={props.icon} />
    </TouchableOpacity>
  );
}
