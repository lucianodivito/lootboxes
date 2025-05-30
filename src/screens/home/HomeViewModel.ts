import {View, Text} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type HomeControllerReturn = {
  handleCrateNativegate: () => void;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

const HomeViewModel = (): HomeControllerReturn => {
  const navigation = useNavigation<NavigationProp>();

  const handleCrateNativegate = () => {
    navigation.navigate('Details');
  };

  return {handleCrateNativegate};
};

export default HomeViewModel;
