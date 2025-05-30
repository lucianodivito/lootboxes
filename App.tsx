import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import AppProviders from './src/providers/AppProviders';

const App = () => (
  <AppProviders>
    <StackNavigator />
  </AppProviders>
);

export default App;
