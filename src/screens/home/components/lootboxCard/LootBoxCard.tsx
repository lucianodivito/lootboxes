import React from 'react';
import {Text, Layout} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {creditsToDollars} from '../../../../utils/moneyConversion';

import FavoriteIcon from '../FavoriteIcon';

import glowingGray from '../../../../../assets/glowings/glow-gray.png';
import pattern from '../../../../../assets/patterns/pattern.png';

import apple from '../../../../../assets/crates/apple.png';
import nintendo from '../../../../../assets/crates/nintendo.png';
import playstation from '../../../../../assets/crates/playstation.png';
import pcgaming from '../../../../../assets/crates/pcgaming.png';
import xbox from '../../../../../assets/crates/xbox.png';
import apple2 from '../../../../../assets/crates/apple2.png';
import nintendo2 from '../../../../../assets/crates/nintendo2.png';
import supreme from '../../../../../assets/crates/supreme.png';
import jordan from '../../../../../assets/crates/supreme.png';
import rolex from '../../../../../assets/crates/rolex.png';

import token from '../../../../../assets/token.png';

import {
  getRarityBadgeGradient,
  getBackgroundGradient,
  getCardColor,
} from '../../utils/getCardColors';

import LootBoxCardViewModel from './LootBoxCardViewModel';

type CrateImageName = keyof typeof crateImages;

const crateImages = {
  apple,
  nintendo,
  playstation,
  pcgaming,
  xbox,
  apple2,
  nintendo2,
  supreme,
  jordan,
  rolex,
};

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export type Prize = {
  name: string;
  rarity: Rarity;
  marketPrice: number;
  probability: number;
  image: string;
};

export type LootboxProps = {
  id: number;
  name: string;
  imageName: CrateImageName;
  tokensPrice: number;
  realPrice: number;
  rarity: Rarity;
  isFavorited: Boolean;
  prizes: Prize[];
};

const LootBoxCard: React.FC<LootboxProps> = ({
  name,
  rarity,
  isFavorited,
  imageName,
  prizes,
  tokensPrice,
}): React.JSX.Element => {
  const {colors, locations} = getBackgroundGradient(rarity);
  const {handleCrateNativegate} = LootBoxCardViewModel();

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => handleCrateNativegate(prizes, tokensPrice)}>
        <View style={styles.cardInner}>
          {/* Fondo gradiente hasta la imagen */}
          <View style={styles.topSection}>
            <LinearGradient
              colors={colors}
              locations={locations}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={StyleSheet.absoluteFill}
            />

            <ImageBackground
              source={pattern}
              resizeMode="cover"
              style={StyleSheet.absoluteFillObject}
              imageStyle={{opacity: 0.5}}
            />

            <View style={styles.cardTop}>
              <LinearGradient
                colors={getRarityBadgeGradient(rarity)}
                style={styles.badgeContainer}>
                <Text category="label">
                  {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </Text>
              </LinearGradient>
            </View>

            <View style={styles.imageContainer}>
              <ImageBackground
                source={glowingGray}
                style={styles.glowBackground}
                imageStyle={styles.glowImage}>
                <Image source={crateImages[imageName]} style={styles.image} />
              </ImageBackground>
            </View>
          </View>

          {/* Contenido textual */}
          <Layout level="2" style={styles.bottomSection}>
            <Text category="p1">{name}</Text>
            <View style={styles.priceContainer}>
              <Image source={token} style={styles.tokenImage} />
              <Text category="h6">{tokensPrice.toLocaleString()}</Text>
              <Text category="c1" appearance="hint" style={{marginLeft: 4}}>
                ${creditsToDollars(tokensPrice)}
              </Text>
            </View>
          </Layout>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LootBoxCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: '48%',
    marginBottom: 8,
    marginHorizontal: 4,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardInner: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  topSection: {
    height: 190,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  bottomSection: {
    padding: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  badgeContainer: {
    width: '50%',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '80%',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowImage: {
    borderRadius: 10,
    opacity: 1,
    resizeMode: 'contain',
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    zIndex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tokenImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
