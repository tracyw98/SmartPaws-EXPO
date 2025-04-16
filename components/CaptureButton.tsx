import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from "react-native";

interface CaptureButtonProps {
  handleTakePicture: () => void;
  onProfileSelect?: (profileId: string) => void;
}

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = 70;
const CAPTURE_SIZE = 80;
const SPACING = 8;
const ITEM_FULL_WIDTH = CIRCLE_SIZE + SPACING;
const CENTER_OFFSET = (width - ITEM_FULL_WIDTH) / 2;

const profiles = [
  { id: "none", name: "" }, // Transparent "no profile"
  { id: "1", name: "1" },
  { id: "2", name: "2" },
  { id: "add", name: "+" },
];

export default function CaptureButton({
  handleTakePicture,
  onProfileSelect,
}: CaptureButtonProps) {
  const listRef = useRef<FlatList>(null);
  const [selectedIndex, setSelectedIndex] = useState(1); // Default to first profile, not "none"
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  const getCenteredIndex = (scrollX: number) => {
    return Math.round(scrollX / ITEM_FULL_WIDTH);
  };

  const scrollToIndex = (index: number) => {
    listRef.current?.scrollToOffset({
      offset: index * ITEM_FULL_WIDTH,
      animated: true,
    });
  };

  useEffect(() => {
    if (!initialScrollDone) {
      scrollToIndex(selectedIndex);
      setInitialScrollDone(true);
    }
  }, [initialScrollDone, selectedIndex]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const newIndex = getCenteredIndex(scrollX);

    if (newIndex >= 0 && newIndex < profiles.length) {
      setSelectedIndex(newIndex);
      onProfileSelect?.(profiles[newIndex].id);
    }
  };

  const handleCapture = () => {
    handleTakePicture();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCapture} style={styles.captureButton} />

      <Animated.FlatList
        ref={listRef}
        data={profiles}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_FULL_WIDTH}
        decelerationRate="fast"
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{
          paddingHorizontal: CENTER_OFFSET,
        }}
        style={styles.slider}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * ITEM_FULL_WIDTH,
            (index - 1) * ITEM_FULL_WIDTH,
            index * ITEM_FULL_WIDTH,
            (index + 1) * ITEM_FULL_WIDTH,
            (index + 2) * ITEM_FULL_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 0.8, 1.15, 0.8, 0.8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 0.8, 1, 0.8, 0.6],
            extrapolate: "clamp",
          });

          const leftFade = scrollX.interpolate({
            inputRange: [
              -width,
              0,
              width * 0.3,
              width * 0.5,
              width * 0.7,
              width,
            ],
            outputRange: [0, 1, 1, 1, 1, 1],
          });

          const isFirst = index === 0;

          return (
            <TouchableOpacity
              onPress={() => scrollToIndex(index)}
              style={styles.item}
            >
              <Animated.View
                style={[
                  isFirst ? styles.transparentCircle : styles.profileCircle,
                  index === selectedIndex &&
                    !isFirst &&
                    styles.selectedProfileCircle,
                  {
                    transform: [{ scale }],
                    opacity: Animated.multiply(opacity, leftFade),
                  },
                ]}
              >
                {!isFirst && (
                  <Animated.Text style={[styles.profileLabel, { opacity }]}>
                    {item.name}
                  </Animated.Text>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  captureButton: {
    width: CAPTURE_SIZE,
    height: CAPTURE_SIZE,
    borderRadius: CAPTURE_SIZE / 2,
    borderWidth: 4,
    borderColor: "white",
    backgroundColor: "transparent",
    zIndex: 1,
    alignSelf: "center",
  },
  slider: {
    position: "absolute",
    zIndex: 2,
  },
  item: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING / 2,
  },
  transparentCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "transparent",
  },
  profileCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#FFF",
    backgroundColor: "#ffffff20",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedProfileCircle: {
    borderColor: "#00BFFF",
    backgroundColor: "#ffffff30",
  },
  profileLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});
