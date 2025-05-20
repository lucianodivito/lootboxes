import React from 'react';
import {
  StyleSheet,
  FlatList,
  ListRenderItem,
  View,
  Dimensions,
} from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import MainContainer from '../../components/MainContainer';
import LootBoxCard from './components/LootBoxCard';
import UserHeader from './components/UserHeader';

// Data
import lootboxes from '../../data/lootboxes.json';

// Data type
import {LootboxProps} from './components/LootBoxCard';

const Home: React.FC = () => {
  const renderItem: ListRenderItem<LootboxProps> = ({item}) => (
    <LootBoxCard
      name={item.name}
      tokensPrice={item.tokensPrice}
      realPrice={item.realPrice}
      rarity={item.rarity}
      isFavorited={item.isFavorited}
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
    marginBottom: 4, // Reducción del espacio entre "All boxes" y el contenido
  },
  headerText: {
    marginTop: 5, // Menos espacio entre "All boxes" y el UserHeader
    marginHorizontal: 3,
  },
});
