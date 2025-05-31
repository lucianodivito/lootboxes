import React from 'react';
import {Layout, Text, Button, Icon} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FlipCard from 'react-native-flip-card';

import FavoriteIcon from '../FavoriteIcon';

import glowingGray from '../../../../../assets/glowings/glow-gray.png';

import pattern from '../../../../../assets/patterns/pattern.png';

import HomeViewModel from '../../HomeViewModel';

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

import {
  getRarityBadgeGradient,
  getBackgroundGradient,
  getCardColor,
} from '../../utils/getCardColors';

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

type Prize = {
  name: string;
  probability: number;
  image: string;
};

export type LootboxProps = {
  id: number;
  name: string;
  imageName: CrateImageName;
  tokensPrice: number;
  realPrice: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isFavorited: Boolean;
  prizes: Prize[];
};

const LootBoxCard: React.FC<LootboxProps> = ({
  name,
  rarity,
  isFavorited,
  prizes,
  imageName,
}): React.JSX.Element => {
  const {colors, locations} = getBackgroundGradient(rarity);

  return (
    <View style={styles.cardWrapper}>
      <FlipCard
        friction={8}
        perspective={1000}
        flipHorizontal
        flipVertical={false}
        clickable
        style={styles.card}>
        {/* FRONT */}
        <View
          style={[styles.cardInner, {backgroundColor: getCardColor(rarity)}]}>
          <LinearGradient
            colors={colors}
            locations={locations}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
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
            <FavoriteIcon
              isFavorited={isFavorited}
              onPress={() => alert(name)}
            />
          </View>

          <View style={styles.imageContainer}>
            <ImageBackground
              source={glowingGray}
              style={styles.glowBackground}
              imageStyle={styles.glowImage}>
              <Image source={crateImages[imageName]} style={styles.image} />
            </ImageBackground>
          </View>

          <Text category="h5">{name}</Text>
        </View>

        {/* BACK */}
        <View
          style={[styles.cardInner, {backgroundColor: getCardColor(rarity)}]}>
          <LinearGradient
            colors={colors}
            locations={locations}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={StyleSheet.absoluteFill}
          />
          <ImageBackground
            source={pattern}
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
            imageStyle={{opacity: 0.5}}
          />

          <View style={styles.prizesContainer}>
            {prizes.map((prize, index) => (
              <View
                key={index.toString()}
                style={[
                  styles.prizeBox,
                  {backgroundColor: getCardColor(rarity)},
                ]}>
                <Image source={{uri: prize.image}} style={styles.prizeImage} />
              </View>
            ))}
          </View>
          <Button style={styles.buttonOpen}>Open</Button>
        </View>
      </FlipCard>
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
    padding: 12,
    borderRadius: 10,
    height: 250,
    alignItems: 'center',
    position: 'relative',
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
    height: '68%',
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
    opacity: 0,
    resizeMode: 'contain',
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    zIndex: 1,
  },
  nameContainer: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  prizeBox: {
    width: '30%',
    aspectRatio: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  prizeText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  prizeImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  buttonOpen: {
    borderRadius: 50,
    width: '100%',
    marginTop: 12,
  },
});
