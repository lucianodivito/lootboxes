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
      startColor = '#2e2f3f';
      endColor = '#1a1b29'; // más oscuro que startColor
      break;
    case 'rare':
      startColor = '#18385d';
      endColor = '#0d1f32';
      break;
    case 'epic':
      startColor = '#542d59';
      endColor = '#2a1530';
      break;
    case 'legendary':
      startColor = '#6a4d1f';
      endColor = '#3b2a0f';
      break;
    default:
      startColor = '#5f4b05';
      endColor = '#2f2502';
  }

  const {colors, locations} = easeGradient({
    colorStops: {
      0: {color: startColor},
      0.6: {color: startColor},
      1: {color: endColor},
    },
    easing: Easing.bezier(0.42, 0, 0.58, 1),
    extraColorStopsPerTransition: 64,
  });

  return {colors, locations};
};
