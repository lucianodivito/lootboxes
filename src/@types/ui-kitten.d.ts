// src/types/ui-kitten.d.ts
import 'react-native';
import '@ui-kitten/components';

declare module '@ui-kitten/components' {
  export interface LayoutProps {
    style?: import('react-native').StyleProp<import('react-native').ViewStyle>;
  }

  export interface ButtonProps {
    style?: import('react-native').StyleProp<import('react-native').ViewStyle>;
  }

  export interface TextProps {
    style?: import('react-native').StyleProp<import('react-native').ViewStyle>;
  }
}
