import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { SharedValue, withTiming } from "react-native-reanimated";
import { CameraDevice } from "react-native-vision-camera";

const ZOOM_LEVELS = [0.5, 1, 2];

export default function ZoomCycleButton({
  zoom,
  device,
}: {
  zoom: SharedValue<number>;
  device: CameraDevice;
}) {
  const [index, setIndex] = useState(1); // Start at 1x

  // Looser tolerance check for real device min/max
  const isSupported = (value: number) => {
    const withinRange =
      value >= device.minZoom - 0.05 && value <= device.maxZoom + 0.05;
    const closeToKnown =
      Math.abs(value - device.minZoom) < 0.1 ||
      Math.abs(value - device.neutralZoom) < 0.1 ||
      Math.abs(value - device.maxZoom) < 0.1;
    return withinRange || closeToKnown;
  };

  const supportedZooms = ZOOM_LEVELS.filter(isSupported);

  useEffect(() => {
    // Set initial zoom to neutralZoom or 1x
    zoom.value = withTiming(device.neutralZoom ?? 1);
  }, []);

  const handlePress = () => {
    const nextIndex = (index + 1) % supportedZooms.length;
    setIndex(nextIndex);
    zoom.value = withTiming(supportedZooms[nextIndex], { duration: 200 });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.label}>{supportedZooms[index]}x</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -4,
  },
  label: {
    color: "#000",
    fontWeight: "600",
    fontSize: 12,
  },
});
