import React, { useRef } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

export default function BellButton() {
  const soundRef = useRef<Audio.Sound | null>(null);

  const handlePress = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/bell.mp3")
        );
        soundRef.current = sound;
      }

      const sound = soundRef.current;

      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await sound.stopAsync(); // Stop if playing
      }

      await sound.setPositionAsync(0); // Reset to start
      await sound.playAsync(); // Play sound
    } catch (error) {
      console.warn("Failed to play bell sound:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.bellButton} onPress={handlePress}>
      <Text style={styles.bellText}>🔔</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bellButton: {
    position: "absolute",
    bottom: 150, // above capture button
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  bellText: {
    fontSize: 28,
  },
});
