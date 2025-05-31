import {easeGradient} from 'react-native-easing-gradient';
import {Easing} from 'react-native';

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export const getRarityBadgeGradient = (rarity: Rarity): string[] => {
  switch (rarity) {
    case 'common':
      return ['#8c8c8c', '#666666'];
    case 'rare':
      return ['#409bfa', '#1867df'];
    case 'epic':
      return ['#cf6ddb', '#7e22d3'];
    case 'legendary':
      return ['#ffb347', '#e7a024'];
    default:
      return ['#fec507', '#666666'];
  }
};

export const getBackgroundGradient = (rarity: Rarity) => {
  let startColor: string;
  let endColor: string;

  switch (rarity) {
    case 'common':
      startColor = '#2c2c3a'; // gris oscuro con tono azulado
      endColor = '#1a1a25'; // casi negro, con azul
      break;
    case 'rare':
      startColor = '#1e3a5f'; // azul oscuro frío
      endColor = '#121e30'; // azul marino profundo
      break;
    case 'epic':
      startColor = '#3c2342'; // violeta oscuro con gris
      endColor = '#211428'; // púrpura profundo
      break;
    case 'legendary':
      startColor = '#4d3714'; // marrón oscuro dorado
      endColor = '#2c1f0c'; // marrón casi negro
      break;
    default:
      startColor = '#3e2c0a'; // dorado quemado
      endColor = '#1e1606'; // sombra cálida
  }

  const {colors, locations} = easeGradient({
    colorStops: {
      0: {color: startColor},
      0.3: {color: startColor},
      1: {color: endColor},
    },
    easing: Easing.bezier(0.42, 0, 0.58, 1),
    extraColorStopsPerTransition: 64,
  });

  return {colors, locations};
};

export const getCardColor = (rarity: Rarity): string => {
  switch (rarity) {
    case 'common':
      return '#5c5d78'; // gris lavanda claro, más brillante
    case 'rare':
      return '#2d7dff'; // azul saturado eléctrico
    case 'epic':
      return '#c03aff'; // púrpura neón
    case 'legendary':
      return '#ffb300'; // dorado brillante intenso
    default:
      return '#5c5d78'; // por defecto, un común brillante
  }
};
