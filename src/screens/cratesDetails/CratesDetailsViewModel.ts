import {View, Text} from 'react-native';
import React from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/StackNavigator';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

const CratesDetailsViewModel = () => {
  const route = useRoute<DetailsRouteProp>();
  const {prizes, tokensPrice} = route.params;

  return {prizes, tokensPrice};
};

export default CratesDetailsViewModel;
