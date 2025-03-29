import React from "react";
import { FlashMode } from "expo-camera";
import IconButton from "./IconButton"; // Adjust if path is different

interface FlashControllerProps {
  flashMode: FlashMode;
  setFlashMode: (mode: FlashMode) => void;
  autoDisable?: boolean; // Optional: turn off after capture
}

const FlashController: React.FC<FlashControllerProps> = ({
  flashMode,
  setFlashMode,
  autoDisable = false,
}) => {
  const toggleFlash = () => {
    const next = flashMode === "off" ? "torch" : "off";
    setFlashMode(next as FlashMode);
  };

  return (
    <IconButton
      iosName={flashMode === "off" ? "bolt.slash.fill" : "bolt.fill"}
      androidName={flashMode === "off" ? "flash-off" : "flash"}
      onPress={toggleFlash}
    />
  );
};

export default FlashController;
