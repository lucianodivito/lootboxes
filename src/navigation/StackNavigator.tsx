import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/HomeView';
import CratesDetails from '../screens/cratesDetails/CratesDetails';
import {Prize} from '../screens/home/components/lootboxCard/LootBoxCard';

type DetailsParams = {prizes: Prize[]; tokensPrice: number};

export type RootStackParamList = {
  Home: undefined;
  Details: DetailsParams;
};

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
};

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={CratesDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
