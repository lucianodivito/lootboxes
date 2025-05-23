import React from 'react';
import {Layout, Text, Button, Icon} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import glowLightBlue from '../../../../assets/glowings/glow-light-blue.png';
import glowingGray from '../../../../assets/glowings/glow-gray.png';
import glowPurple from '../../../../assets/glowings/glow-purple.png';
import glowYellow from '../../../../assets/glowings/glow-yellow.png';

import commonCrate from '../../../../assets/crates/commonCrate.png';
import rareCrate from '../../../../assets/crates/rareCrate.png';
import epicCrate from '../../../../assets/crates/epicCrate.png';
import legendaryCrate from '../../../../assets/crates/legendaryCrate.png';

import pattern from '../../../../assets/patterns/pattern.png';

import {
  getRarityBadgeGradient,
  getBackgroundGradient,
} from '../utils/getCardGradients';

type FavoriteIconProps = {
  isFavorited: Boolean;
  onPress: (event: GestureResponderEvent) => void;
};

const FavoriteIcon = ({
  isFavorited,
  onPress,
}: FavoriteIconProps): React.JSX.Element => (
  <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
    <Icon
      style={styles.icon}
      fill={isFavorited ? '#FFD700' : '#8F9BB3'}
      name={isFavorited ? 'star' : 'star-outline'}
    />
  </TouchableOpacity>
);

export type LootboxProps = {
  name: string;
  tokensPrice: number;
  realPrice: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isFavorited: Boolean;
};

const LootBoxCard: React.FC<LootboxProps> = ({
  name,
  tokensPrice,
  realPrice,
  rarity,
  isFavorited,
}): React.JSX.Element => {
  const {colors, locations} = getBackgroundGradient(rarity);

  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={styles.card}>
      {/* Pattern overlay, above gradient but below content */}
      <ImageBackground
        source={pattern}
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
        imageStyle={{opacity: 0.5}} // Opcional: controla visibilidad
      />

      {/* Rarity badge */}
      <View style={styles.cardTop}>
        <LinearGradient
          colors={getRarityBadgeGradient(rarity)}
          style={styles.badgeContainer}>
          <Text category="label" style={{color: 'white'}}>
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
          </Text>
        </LinearGradient>

        <FavoriteIcon
          isFavorited={isFavorited}
          onPress={() => {
            alert(name);
          }}
        />
      </View>

      <View style={styles.imageContainer}>
        <ImageBackground
          source={glowingGray}
          style={styles.glowBackground}
          imageStyle={styles.glowImage}>
          <Image
            source={
              rarity === 'common'
                ? commonCrate
                : rarity === 'rare'
                ? rareCrate
                : rarity === 'epic'
                ? epicCrate
                : rarity === 'legendary'
                ? legendaryCrate
                : null
            }
            alt="lootbox"
            style={styles.image}
          />
        </ImageBackground>
      </View>

      <View style={styles.nameContainer}>
        <Text category="h5">{name}</Text>
      </View>
    </LinearGradient>
  );
};

export default LootBoxCard;

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 10,
    height: 250,
    width: '48%',
    marginBottom: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '12%',
  },
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 25,
    width: 90,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '68%', // aumentado
  },
  glowBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    zIndex: 0,
  },
  glowImage: {
    borderRadius: 10,
    opacity: 0,
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    zIndex: 1,
  },
  nameContainer: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
});
