import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {Layout, Text, Button, Icon} from '@ui-kitten/components';

type FavoriteIconProps = {
  isFavorited: Boolean;
  onPress: (event: GestureResponderEvent) => void;
};

const FavoriteIcon = ({
  isFavorited,
  onPress,
}: FavoriteIconProps): React.JSX.Element => (
  <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
    <Icon
      style={styles.icon}
      fill={isFavorited ? '#FFD700' : '#8F9BB3'}
      name={isFavorited ? 'star' : 'star-outline'}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export default FavoriteIcon;
