import {View, Text} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../../../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {Prize} from './LootBoxCard';

type HomeControllerReturn = {
  handleCrateNativegate: (prizes: Prize[], tokensPrice: number) => void;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

const LootBoxCardViewModel = (): HomeControllerReturn => {
  const navigation = useNavigation<NavigationProp>();

  const handleCrateNativegate = (prizes: Prize[], tokensPrice: number) => {
    navigation.navigate('Details', {prizes, tokensPrice});
  };

  return {handleCrateNativegate};
};

export default LootBoxCardViewModel;
