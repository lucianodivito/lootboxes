import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {customDarkTheme} from '../theme/custom-theme';

interface Props {
  children: React.ReactNode;
}

const AppProviders = ({children}: Props) => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark, ...customDarkTheme}}>
        <NavigationContainer>{children}</NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default AppProviders;
