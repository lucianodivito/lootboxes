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
      endColor = '#2e2f3f'; // más oscuro pero similar
      break;
    case 'rare':
      startColor = '#18385d';
      endColor = '#102640'; // tono más profundo del azul
      break;
    case 'epic':
      startColor = '#542d59';
      endColor = '#3b1f3d'; // más oscuro, misma gama
      break;
    case 'legendary':
      startColor = '#6a4d1f';
      endColor = '#4a3615'; // más apagado y oscuro
      break;
    default:
      startColor = '#5f4b05';
      endColor = '#3f3203'; // más oscuro, mismo tono
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
      return '#2e2f3f'; // se mantiene
    case 'rare':
      return '#112949'; // más oscuro que #18385d
    case 'epic':
      return '#3e2142'; // más oscuro que #542d59
    case 'legendary':
      return '#4f3a17'; // más oscuro que #6a4d1f
    default:
      return '#2e2f3f';
  }
};
