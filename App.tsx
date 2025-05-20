import React from 'react';
import {StyleSheet} from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Home from './src/screens/home/Home';
import {customDarkTheme} from './src/theme/custom-theme';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{...eva.dark, ...customDarkTheme}}>
      <Home />
    </ApplicationProvider>
  </>
);
