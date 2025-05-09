import React, { useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  FlatList as RNFlatList,
  Pressable,
  View,
  Text,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
const CARD_HEIGHT = height * 0.12;
const EXPANDED_HEIGHT = height * 0.25;
const SPACING = 10;
const SCROLL_INTERVAL = CARD_HEIGHT + SPACING;

const cards = [
  {
    id: 1,
    title: "Excitement",
    shortDesc: "Jumping, wagging, tongue out, zoomies, wiggly.",
    fullDesc:
      "Dusty is clearly excited, jumping with energy and eager to engage as he anticipates playtime.",
    percentage: "10%",
    color: "#F5F5F5",
  },
  {
    id: 2,
    title: "Aggression",
    shortDesc: "Growling, stiff body, bared teeth, intense, raised hackles.",
    fullDesc:
      "Dusty is displaying signs of mild aggression due to being overstimulated after a long, noisy walk and needing some space to decompress.",
    percentage: "60%",
    color: "#F5F5F5",
  },
  {
    id: 3,
    title: "Calmness",
    shortDesc: "Lying down, soft eyes, loose body, steady, chill.",
    fullDesc:
      "Dusty is calm and content, lying down with soft eyes and enjoying a peaceful moment.",
    percentage: "10%",
    color: "#F5F5F5",
  },
  {
    id: 4,
    title: "Anxiety",
    shortDesc: "Pacing, whining, tucked tail, alert, restless.",
    fullDesc:
      "Dusty is showing signs of anxiety, pacing and whining in response to a change in his routine.",
    percentage: "10%",
    color: "#F5F5F5",
  },
  {
    id: 5,
    title: "Sadness",
    shortDesc: "Tail down, ears low, quiet, slow, withdrawn.",
    fullDesc:
      "Dusty is showing signs of sadness after being left alone for a while and seems to be seeking quiet comfort.",
    percentage: "5%",
    color: "#F5F5F5",
  },
  {
    id: 6,
    title: "Happiness",
    shortDesc: "Tail wagging, playful, bright eyes, bouncy, relaxed.",
    fullDesc:
      "Dusty is displaying signs of happiness, wagging his tail and bouncing around after seeing a familiar face.",
    percentage: "5%",
    color: "#F5F5F5",
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList);

const AnimatedCard = ({ item, index, currentIndex }) => {
  const [isActive, setIsActive] = useState(false);

  useAnimatedReaction(
    () => currentIndex.value === index,
    (active) => {
      runOnJS(setIsActive)(active);
    },
    [currentIndex]
  );

  const animatedStyle = useAnimatedStyle(() => {
    const active = currentIndex.value === index;
    return {
      height: withSpring(active ? EXPANDED_HEIGHT : CARD_HEIGHT, {
        damping: 15,
        mass: 0.5,
      }),
      transform: [
        { scale: withSpring(active ? 1 : 0.95, { damping: 10, mass: 0.5 }) },
      ],
      opacity: withSpring(active ? 1 : 0.6, { damping: 20 }),
    };
  });

  return (
    <Pressable>
      <Animated.View
        style={[styles.card, animatedStyle, { backgroundColor: item.color }]}
      >
        <View style={[styles.cardInner, isActive && styles.cardInnerExpanded]}>
          <View style={styles.row}>
            <View style={styles.textColumn}>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: isActive ? 18 : 14,
                    marginBottom: isActive ? 8 : 2,
                  },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.description,
                  isActive ? styles.full : styles.short,
                  isActive ? { fontFamily: "Figtree-Regular" } : {},
                ]}
                numberOfLines={isActive ? undefined : 2}
                ellipsizeMode="tail"
              >
                {isActive ? item.fullDesc : item.shortDesc}
              </Text>
            </View>

            <View style={styles.percentColumn}>
              <Text
                style={[
                  styles.percentage,
                  isActive
                    ? {
                        fontSize: 30,
                        fontWeight: "500",
                        marginTop: 30,
                      }
                    : {
                        fontSize: 25,
                        fontWeight: "400",
                        marginTop: 10, // adjust spacing here
                        opacity: 0.6, // optional: makes it look less prominent
                      },
                ]}
              >
                {item.percentage}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const MoodCardCarousel = () => {
  const currentIndex = useSharedValue(0);
  const listRef = useRef(null);

  const handleScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    const maxScroll = (cards.length - 1) * SCROLL_INTERVAL;
    const boundedY = Math.max(0, Math.min(y, maxScroll));

    const newIndex = Math.round(boundedY / SCROLL_INTERVAL);
    const prevIndex = currentIndex.value;

    if (newIndex !== prevIndex) {
      const delta = Math.sign(newIndex - prevIndex);
      currentIndex.value = Math.max(
        0,
        Math.min(cards.length - 1, prevIndex + delta)
      );
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        ref={listRef}
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={styles.contentContainer}
        snapToInterval={SCROLL_INTERVAL}
        snapToAlignment="center"
        decelerationRate="fast"
        disableIntervalMomentum
        overScrollMode="never"
        renderItem={({ item, index }) => (
          <AnimatedCard item={item} index={index} currentIndex={currentIndex} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    paddingVertical: height * 0.2,
    paddingHorizontal: 16,
    paddingBottom: 500,
  },
  card: {
    marginVertical: SPACING / 3,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    backgroundColor: "#fff",
  },
  cardInner: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  cardInnerExpanded: {
    paddingTop: 18,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textColumn: {
    flex: 1,
    paddingRight: 12,
  },
  percentColumn: {
    width: 60,
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "Poppins-Bold",
    color: "#333",
  },
  percentage: {
    fontFamily: "Poppins-Regular",
    color: "#F25C5C",
  },
  description: {
    color: "#666",
  },
  short: {
    fontSize: 12,
    marginTop: 4,
  },
  full: {
    fontSize: 12,
    lineHeight: 20,
    marginTop: 0,
  },
});

export default MoodCardCarousel;
