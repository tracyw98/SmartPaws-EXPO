import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width: screenWidth } = Dimensions.get("window");

export default function YellowWaveBackground() {
  return (
    <Svg
      width={screenWidth * 1.4}
      height={300}
      viewBox="0 0 1005 628"
      style={styles.svg}
      preserveAspectRatio="none"
    >
      <Path
        d="M838.925 97.43C607.89 263.485 348.246 101.666 247.303 0C60.6823 235.103 -200.587 662.736 247.303 492.445C695.193 322.154 903.676 511.861 951.931 628C1010.53 381.954 1069.96 -68.6246 838.925 97.43Z"
        fill="#FFE265"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  svg: {
    position: "absolute",
    top: 60, // Move it lower or higher to fit under logo/camera
    left: -80, // Shift left to center it more if it’s off
    zIndex: -1,
  },
});
