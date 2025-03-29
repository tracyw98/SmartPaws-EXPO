import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CameraView, FlashMode } from "expo-camera";
import useCameraAccess from "../hooks/useCameraAccess";
import IconButton from "../components/IconButton";
import CaptureButton from "../components/CaptureButton"; // ✅ updated name

export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  const { cameraPermission } = useCameraAccess();

  const [cameraFacing, setCameraFacing] = React.useState<"front" | "back">(
    "back"
  );
  const [flashMode, setFlashMode] = React.useState<FlashMode>("off");
  const [zoom, setZoom] = React.useState(0.00000000002); // zoom state

  const handleTakePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync();
      console.log("Photo URI:", photo?.uri);
    } catch (error) {
      console.error("Failed to take picture:", error);
    }
  };

  if (cameraPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Checking camera permissions...</Text>
      </View>
    );
  }

  if (!cameraPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Camera access denied. Please enable it in settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={cameraFacing}
        flash={flashMode}
        zoom={zoom} // added zoom prop
        onCameraReady={() => console.log("Camera is ready")}
      >
        {/* 🔘 Top-right controls */}
        <View style={styles.controlsContainer}>
          <IconButton
            iosName="person.crop.circle"
            androidName="person-circle-outline"
            onPress={() => console.log("Go to profile")}
            width={40}
            height={40}
          />
          <IconButton
            iosName={flashMode === "off" ? "bolt.slash.fill" : "bolt.fill"}
            androidName={flashMode === "off" ? "flash-off" : "flash"}
            onPress={() =>
              setFlashMode((prev) => (prev === "off" ? "torch" : "off"))
            }
            width={40}
            height={40}
          />
          <IconButton
            iosName="arrow.triangle.2.circlepath.camera"
            androidName="camera-reverse-outline"
            onPress={() =>
              setCameraFacing((prev) => (prev === "back" ? "front" : "back"))
            }
            width={40}
            height={40}
          />
        </View>

        {/* 📸 Center capture button */}
        <CaptureButton
          handleTakePicture={handleTakePicture}
          zoom={zoom}
          setZoom={setZoom}
        />
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controlsContainer: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#F2F2F2CC",
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});
