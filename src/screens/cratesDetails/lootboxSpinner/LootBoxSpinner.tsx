import React, {useRef, useState, useEffect, useMemo} from 'react';
import {View, Dimensions, Animated, Image, ScrollView} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import {getCardColor} from '../../home/utils/getCardColors';

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
  <View
    style={{
      width: ITEM_WIDTH,
      alignItems: 'center',
      paddingVertical: 8,
      // backgroundColor: getCardColor(item.rarity),
    }}>
    <Image
      source={{uri: item.image}}
      style={{width: 80, height: 80, resizeMode: 'contain', marginBottom: 4}}
    />
    <Text category="c1" numberOfLines={1}>
      {item.name}
    </Text>
  </View>
));

const LootboxSpinner: React.FC<LootboxSpinnerProps> = ({prizes}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [spinning, setSpinning] = useState(false);

  const prizePool = useMemo(() => {
    return prizes.flatMap(prize => Array(prize.probability).fill(prize));
  }, [prizes]);

  const REPEAT_TIMES = 3;

  // ⛔ Nunca se vuelve a recalcular: se fija desde el principio
  const stableDisplayPool = useMemo(() => {
    const fullPool = Array(REPEAT_TIMES)
      .fill(null)
      .flatMap(() => shuffleArray(prizePool));
    return [
      {id: 'spacer-start'},
      ...fullPool.map((p, i) => ({...p, id: `${p.name}-${i}`})),
      {id: 'spacer-end'},
    ];
  }, []); // 👈 sin dependencias, nunca cambia

  const startIndex = Math.floor(stableDisplayPool.length / 2);
  const startOffset = startIndex * ITEM_WIDTH;
  const MAX_OFFSET = stableDisplayPool.length * ITEM_WIDTH;
  const CENTER_OFFSET = startIndex * ITEM_WIDTH;

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: startOffset,
      animated: false,
    });
  }, []);

  const animateScroll = (from: number, to: number, duration: number) => {
    return new Promise<void>(resolve => {
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = 1 - Math.pow(1 - t, 3);
        let current = from + (to - from) * easedT;

        if (current > MAX_OFFSET * 0.9) {
          current = CENTER_OFFSET + (current % CENTER_OFFSET);
        }

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

    const actualItemsCount = stableDisplayPool.length - 2;
    const loops = 3 * actualItemsCount;
    const targetIndex = Math.floor(Math.random() * actualItemsCount);
    const finalIndex = loops + targetIndex;
    const adjustedIndex = finalIndex + 1;

    const to = adjustedIndex * ITEM_WIDTH - SPACER;
    const from = startOffset;

    await animateScroll(from, to, 6000);

    const selected = stableDisplayPool[(adjustedIndex % actualItemsCount) + 1]; // asegurar que index no se salga
    setSelectedPrize(selected as Prize);
    console.log('Premio seleccionado visualmente:', selected);

    setSpinning(false);
  };

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
        {stableDisplayPool.map((item, index) => {
          if (item.id.startsWith('spacer')) {
            return <View key={item.id} style={{width: ITEM_WIDTH}} />;
          }
          return <LootboxItem key={item.id} item={item} />;
        })}
      </Animated.ScrollView>

      <Button
        onPress={handleSpin}
        disabled={spinning}
        style={{marginVertical: 12, width: 150}}>
        {spinning ? 'Spinning...' : 'Spin'}
      </Button>
    </View>
  );
};

export default LootboxSpinner;
