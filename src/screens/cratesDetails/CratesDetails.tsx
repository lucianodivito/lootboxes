import {StyleSheet, FlatList, Image, View, ImageBackground} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import MainContainer from '../../components/MainContainer';
import CratesDetailsViewModel from './CratesDetailsViewModel';
import {getCardColor} from '../home/utils/getCardColors';
import pattern from '../../../assets/patterns/pattern.png';
import LootboxSpinner from './lootboxSpinner/LootBoxSpinner';

const CratesDetails: React.FC = (): React.JSX.Element => {
  const {prizes, tokensPrice} = CratesDetailsViewModel();

  const renderItem = ({item}: {item: any}) => {
    const color = getCardColor(item.rarity);

    return (
      <View style={styles.itemWrapper}>
        <Layout style={styles.item} level="2">
          {/* <ImageBackground
            source={pattern}
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
            imageStyle={{opacity: 0.5}}
          /> */}
          <Text style={styles.probability}>{item.probability}%</Text>
          <Image source={{uri: item.image}} style={styles.image} />
          <Text category="s1">{item.name}</Text>
          <Text appearance="hint">${item.marketPrice}</Text>
        </Layout>
      </View>
    );
  };

  return (
    <MainContainer>
      <LootboxSpinner prizes={prizes} tokensPrice={tokensPrice} />
      <FlatList
        data={prizes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  list: {},
  itemWrapper: {
    width: '33.33%',
    padding: 5,
  },
  item: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 5,
    borderRadius: 8,
  },
  name: {
    textAlign: 'center',
    fontWeight: '600',
  },
  probability: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
    zIndex: 999,
  },
});

export default CratesDetails;
