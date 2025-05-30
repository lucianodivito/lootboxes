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

import FavoriteIcon from './FavoriteIcon';

import glowingGray from '../../../../assets/glowings/glow-gray.png';

import commonCrate from '../../../../assets/crates/commonCrate.png';
import rareCrate from '../../../../assets/crates/rareCrate.png';
import epicCrate from '../../../../assets/crates/epicCrate.png';
import legendaryCrate from '../../../../assets/crates/legendaryCrate.png';

import pattern from '../../../../assets/patterns/pattern.png';

import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  getRarityBadgeGradient,
  getBackgroundGradient,
  getCardColor,
} from '../utils/getCardColors';

export type LootboxProps = {
  id: number;
  name: string;
  tokensPrice: number;
  realPrice: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isFavorited: Boolean;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

const LootBoxCard: React.FC<LootboxProps> = ({
  name,
  rarity,
  isFavorited,
}): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp>();

  const {colors, locations} = getBackgroundGradient(rarity);

  return (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: getCardColor(rarity)}]}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('Details');
      }}>
      <LinearGradient
        colors={colors}
        locations={locations}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}></LinearGradient>

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

        <FavoriteIcon isFavorited={isFavorited} onPress={() => alert(name)} />
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

      <View style={styles.nameContainer}>
        <Text category="h5">{name}</Text>
      </View>
    </TouchableOpacity>
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
});
