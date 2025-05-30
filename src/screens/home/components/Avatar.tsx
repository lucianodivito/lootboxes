import React from 'react';
import {View, ImageBackground} from 'react-native';
import {
  Text,
  Avatar as KittenAvatar,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {getInitials} from '../utils/getInitials';

interface AvatarProps {
  name: string;
  surname: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({name, surname, size = 50}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <ImageBackground style={[styles.avatar, {width: size, height: size}]}>
      <Text style={styles.initials}>{getInitials(name, surname)}</Text>
    </ImageBackground>
  );
};

const themedStyles = StyleService.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#479fff',
    borderRadius: 9999,
    marginRight: 12,
  },
  initials: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Avatar;
