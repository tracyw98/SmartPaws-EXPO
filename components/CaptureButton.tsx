import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

interface CaptureButtonProps {
  handleTakePicture: () => void;
}

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = 60; // 🔧 Adjust size of each profile circle
const SPACING = 12;

const profiles = [
  { id: "1", name: "+" },
  { id: "2", name: "+" },
];

export default function CaptureButton({
  handleTakePicture,
}: CaptureButtonProps) {
  const listRef = useRef<FlatList>(null);
  const [selectedProfile, setSelectedProfile] = useState(profiles[0].id);

  const handleSnap = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (CIRCLE_SIZE + SPACING));
    const profile = profiles[index];
    if (profile) setSelectedProfile(profile.id);
  };

  return (
    <View style={styles.container}>
      {/* 👇 This FlatList is horizontally scrollable and centered */}
      <FlatList
        ref={listRef}
        data={profiles}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CIRCLE_SIZE + SPACING}
        decelerationRate="fast"
        keyExtractor={(item) => item.id}
        onScrollEndDrag={handleSnap}
        contentContainerStyle={{
          paddingHorizontal: (width - CIRCLE_SIZE) / 2,
        }}
        renderItem={({ item }) => (
          <View style={styles.profileCircle}>
            <Text style={styles.profileLabel}>{item.name}</Text>
          </View>
        )}
        style={styles.slider}
      />

      {/* 👇 Fixed, centered capture button layered on top */}
      <TouchableOpacity
        onPress={handleTakePicture}
        style={styles.captureButton}
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
  slider: {
    position: "absolute",
    bottom: 0,
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
    marginHorizontal: SPACING / 2,
  },
  profileLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
    backgroundColor: "transparent",
    zIndex: 1,
  },
});
