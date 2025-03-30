import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

interface CaptureButtonProps {
  handleTakePicture: () => void;
}

export default function CaptureButton({
  handleTakePicture,
}: CaptureButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleTakePicture}
        style={styles.buttonOuter}
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
  buttonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4.5,
    borderColor: "white",
    backgroundColor: "transparent",
  },
});
