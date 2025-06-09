import React, {useRef, useState, useEffect, useMemo} from 'react';
import {
  View,
  Dimensions,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Button, Text, Layout} from '@ui-kitten/components';
import {getCardColor} from '../../home/utils/getCardColors';
import MainContainer from '../../../components/MainContainer';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = 100;
const SPACER = (width - ITEM_WIDTH) / 2;

type Prize = {
  image: string;
  marketPrice: number;
  name: string;
  probability: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
};

interface LootboxSpinnerProps {
  prizes: Prize[];
  tokensPrice: number;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const LootboxItem = React.memo(({item}: {item: Prize}) => (
  <Layout
    level="2"
    style={{
      width: ITEM_WIDTH,
      alignItems: 'center',
      paddingVertical: 12,
    }}>
    <Image
      source={{uri: item.image}}
      style={{width: 80, height: 80, resizeMode: 'contain', marginBottom: 4}}
    />
    <Text category="c1" numberOfLines={1}>
      {item.name}
    </Text>
  </Layout>
));

const LootboxSpinner: React.FC<LootboxSpinnerProps> = ({
  prizes,
  tokensPrice,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [displayPool, setDisplayPool] = useState<any[]>([]);

  const prizePool = useMemo(() => {
    return prizes.flatMap(prize => Array(prize.probability).fill(prize));
  }, [prizes]);

  const generateDisplayPool = () => {
    const REPEAT_TIMES = 3;
    const fullPool = Array(REPEAT_TIMES)
      .fill(null)
      .flatMap(() => shuffleArray(prizePool));
    return [
      {id: 'spacer-start'} as any,
      ...fullPool.map((p, i) => ({...p, id: `${p.name}-${i}`})),
      {id: 'spacer-end'} as any,
    ];
  };

  const animateScroll = (from: number, to: number, duration: number) => {
    return new Promise<void>(resolve => {
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = 1 - Math.pow(1 - t, 3);
        const current = from + (to - from) * easedT;

        scrollViewRef.current?.scrollTo({
          x: current,
          animated: false,
        });

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          scrollViewRef.current?.scrollTo({
            x: to,
            animated: false,
          });
          resolve();
        }
      };
      animate();
    });
  };

  const handleSpin = async () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedPrize(null);

    const newDisplayPool = generateDisplayPool();
    setDisplayPool(newDisplayPool);

    await new Promise(res => setTimeout(res, 0)); // esperar un render para que displayPool se actualice

    const actualItemsCount = newDisplayPool.length - 2;
    const loops = 3 * actualItemsCount;
    const targetIndex = Math.floor(Math.random() * actualItemsCount);
    const finalIndex = loops + targetIndex;
    const adjustedIndex = Math.min(finalIndex + 1, newDisplayPool.length - 2);
    const to = adjustedIndex * ITEM_WIDTH - SPACER;
    const from = Math.floor(newDisplayPool.length / 2) * ITEM_WIDTH;

    await animateScroll(from, to, 6000);

    const selected = newDisplayPool[adjustedIndex - 2];
    setSelectedPrize(selected as Prize);
    console.log('Premio seleccionado:', selected.name);

    setSpinning(false);
  };

  useEffect(() => {
    const initialPool = generateDisplayPool();
    setDisplayPool(initialPool);

    // Posicionar al centro
    const initialOffset = Math.floor(initialPool.length / 2) * ITEM_WIDTH;
    scrollViewRef.current?.scrollTo({
      x: initialOffset,
      animated: false,
    });
  }, []);

  return (
    <View style={{alignItems: 'center'}}>
      {/* Flecha centrada */}
      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          width: 0,
          height: 0,
          borderLeftWidth: 15,
          borderRightWidth: 15,
          borderBottomWidth: 20,
          borderStyle: 'solid',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#fff',
          left: width / 2 - 15,
          transform: [{rotate: '180deg'}],
        }}
      />

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: SPACER}}
        scrollEventThrottle={16}>
        {displayPool.map((item, index) => {
          if (!item?.id) return null;
          if (item.id.startsWith('spacer')) {
            return <View key={item.id} style={{width: ITEM_WIDTH}} />;
          }
          return <LootboxItem key={item.id} item={item} />;
        })}
      </Animated.ScrollView>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={handleSpin}
          disabled={spinning}
          style={styles.demoSpinButton}>
          {spinning ? 'Spinning...' : 'Demo spin'}
        </Button>
        <Button
          onPress={handleSpin}
          disabled={spinning}
          style={styles.spinButton}>
          {spinning ? 'Spinning...' : `Spin for $${tokensPrice}`}
        </Button>
      </View>
    </View>
  );
};

export default LootboxSpinner;

const styles = StyleSheet.create({
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  demoSpinButton: {
    width: '48%',
    marginVertical: 12,
    backgroundColor: '#8F9BB3',
    borderWidth: 0,
  },
  spinButton: {
    width: '48%',
    marginVertical: 12,
  },
});
