// components/DogProfileSlider.tsx
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const ITEM_WIDTH = 70;
const ITEM_SPACING = (screenWidth - ITEM_WIDTH) / 2;

interface Props {
  onSelectProfile: (index: number) => void;
}

export default function DogProfileSlider({ onSelectProfile }: Props) {
  const scrollX = useRef(new Animated.Value(0)).current;

  // Show 3 empty profile slots with "+"
  const placeholderProfiles = Array(3).fill({ isAddNew: true });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={placeholderProfiles}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_WIDTH
          );
          onSelectProfile(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.circle}>
              <Text style={styles.icon}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 160, // Place above Capture button
    width: "100%",
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 24,
    color: "#aaa",
  },
});
