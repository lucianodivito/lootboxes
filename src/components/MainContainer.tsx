import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {Layout} from '@ui-kitten/components';
import backgroundPattern from '../../assets/patterns/backgroundPattern.png';

type Props = {
  children: React.ReactNode;
};

const MainContainer: React.FC<Props> = ({children}) => {
  return (
    <Layout style={styles.mainContainer} level="1">
      <ImageBackground
        source={backgroundPattern}
        style={styles.background}
        resizeMode="repeat"
        imageStyle={styles.imageStyle} // opcional para ajustar imagen
      >
        {children}
      </ImageBackground>
    </Layout>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 12,
  },
  background: {
    flex: 1,
  },
  imageStyle: {
    // Opcional: ajustar opacidad o tamaño del patrón
    opacity: 0.2,
  },
});
