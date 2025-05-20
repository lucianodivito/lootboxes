import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';

type Props = {
  children: React.ReactNode;
};

const MainContainer: React.FC<Props> = ({children}) => {
  return <Layout style={styles.mainContainer}>{children}</Layout>;
};

export default MainContainer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 12,
  },
});
