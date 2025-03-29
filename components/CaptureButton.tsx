import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";

interface CaptureButtonProps {
  handleTakePicture: () => void;
  zoom: number;
  setZoom: (zoom: number) => void;
}

export default function CaptureButton({
  handleTakePicture,
  zoom,
  setZoom,
}: CaptureButtonProps) {
  const startY = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        startY.current = gestureState.y0;
      },
      onPanResponderMove: (
        _: GestureResponderEvent,
        gesture: PanResponderGestureState
      ) => {
        const deltaY = startY.current - gesture.moveY;
        const zoomChange = deltaY / 300; // Adjust divisor for sensitivity
        let newZoom = Math.min(Math.max(zoom + zoomChange, 0), 1); // clamp between 0-1
        setZoom(parseFloat(newZoom.toFixed(2)));
      },
      onPanResponderRelease: () => {
        handleTakePicture(); // only take the photo when they lift finger
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers} style={styles.buttonOuter} />
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
