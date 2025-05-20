// src/types/linear-gradient.d.ts
import 'react-native';
import 'react-native-linear-gradient';

declare module 'react-native-linear-gradient' {
  export interface LinearGradientProps {
    // start?: {x: number; y: number};
    // end?: {x: number; y: number};
    // locations?: number[];
    style?: import('react-native').StyleProp<import('react-native').ViewStyle>;
  }
}
