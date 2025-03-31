import React, { useRef } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

// 🔧 To change circle size, update ITEM_SIZE here
const ITEM_SIZE = 60;
const SPACING = 12;

const profiles = [
  { id: "1", name: "Dog 1" },
  { id: "2", name: "Dog 2" },
  { id: "3", name: "Dog 3" },
  { id: "add", name: "+" },
];

export default function DogProfileSlider({
  onProfileSelect,
}: {
  onProfileSelect: (profileId: string) => void;
}) {
  const listRef = useRef<FlatList>(null);

  const handleSnap = (event: any) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (ITEM_SIZE + SPACING)
    );
    const profile = profiles[index];
    if (profile) {
      onProfileSelect(profile.id);
    }
  };

  return (
    <View style={styles.sliderContainer}>
      <FlatList
        ref={listRef}
        data={profiles}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_SIZE) / 2,
        }}
        keyExtractor={(item) => item.id}
        onScrollEndDrag={handleSnap}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <View style={styles.circle}>
              <Text style={styles.label}>{item.name === "+" ? "+" : "🐶"}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    position: "absolute",
    bottom: 140,
    width: "100%",
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING / 2,
  },
  circle: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    borderWidth: 2,
    borderColor: "#fff",
    borderStyle: "dashed", // ✅ Dotted look
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000066",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
