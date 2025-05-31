import React from 'react';
import {StyleSheet, FlatList, ListRenderItem} from 'react-native';
import {Text} from '@ui-kitten/components';
import MainContainer from '../../components/MainContainer';
import LootBoxCard from './components/lootboxCard/LootBoxCard';
import UserHeader from './components/UserHeader';

// Data
import rawLootboxes from '../../data/lootboxes.json';

// Data type
import {LootboxProps} from './components/lootboxCard/LootBoxCard';

const lootboxes = rawLootboxes as LootboxProps[];

const Home: React.FC = (): React.JSX.Element => {
  const renderItem: ListRenderItem<LootboxProps> = ({item}) => (
    <LootBoxCard
      id={item.id}
      name={item.name}
      imageName={item.imageName}
      tokensPrice={item.tokensPrice}
      realPrice={item.realPrice}
      rarity={item.rarity}
      isFavorited={item.isFavorited}
      prizes={item.prizes}
    />
  );

  return (
    <MainContainer>
      <FlatList
        style={styles.list}
        data={lootboxes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => (
          <>
            <UserHeader />
            <Text category="h4" style={styles.headerText}>
              All boxes
            </Text>
          </>
        )}
        ListHeaderComponentStyle={styles.header}
      />
    </MainContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  header: {
    width: '100%',
    marginBottom: 4,
  },
  headerText: {
    marginTop: 5,
    marginHorizontal: 3,
  },
});
