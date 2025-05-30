import React from 'react';
import {Layout, Text, Button, Icon} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FlipCard from 'react-native-flip-card';

import FavoriteIcon from '../FavoriteIcon';

import glowingGray from '../../../../../assets/glowings/glow-gray.png';

import commonCrate from '../../../../../assets/crates/commonCrate.png';
import rareCrate from '../../../../../assets/crates/rareCrate.png';
import epicCrate from '../../../../../assets/crates/epicCrate.png';
import legendaryCrate from '../../../../../assets/crates/legendaryCrate.png';

import pattern from '../../../../../assets/patterns/pattern.png';

import HomeViewModel from '../../HomeViewModel';

import {
  getRarityBadgeGradient,
  getBackgroundGradient,
  getCardColor,
} from '../../utils/getCardColors';

export type LootboxProps = {
  id: number;
  name: string;
  tokensPrice: number;
  realPrice: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isFavorited: Boolean;
  prizes: Number[];
};

const LootBoxCard: React.FC<LootboxProps> = ({
  name,
  rarity,
  isFavorited,
  prizes,
}): React.JSX.Element => {
  const {handleCrateNativegate} = HomeViewModel();

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
                style={styles.image}
              />
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
              <View key={index.toString()} style={styles.prizeBox}>
                <Text>{prize}</Text>
              </View>
            ))}
          </View>
          <Button appearance="outline" style={styles.buttonOpen}>
            Open
          </Button>
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
  prizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  prizeBox: {
    width: '30%',
    aspectRatio: 1, // asegura forma cuadrada
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
  buttonOpen: {
    borderRadius: 50,
    width: '100%',
    marginTop: 12,
  },
});
