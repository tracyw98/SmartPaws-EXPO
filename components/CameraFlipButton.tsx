import React from "react";
import IconButton from "./IconButton";

interface CameraFlipButtonProps {
  facing: "front" | "back";
  setFacing: (facing: "front" | "back") => void;
}

const CameraFlipButton: React.FC<CameraFlipButtonProps> = ({
  facing,
  setFacing,
}) => {
  const handleFlip = () => {
    setFacing(facing === "back" ? "front" : "back");
  };

  return (
    <IconButton
      iosName="arrow.triangle.2.circlepath.camera"
      androidName="camera-reverse-outline"
      onPress={handleFlip}
    />
  );
};

export default CameraFlipButton;
