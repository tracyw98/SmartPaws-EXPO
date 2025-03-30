import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { CameraView, FlashMode } from "expo-camera";
import useCameraAccess from "../hooks/useCameraAccess";
import IconButton from "../components/IconButton";
import CaptureButton from "../components/CaptureButton";
import GalleryComponent from "../components/GalleryComponent";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import BellButton from "../components/BellButton";

const screen = Dimensions.get("window");

export default function HomeScreen() {
  const cameraRef = useRef(null);
  const { cameraPermission } = useCameraAccess();

  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [zoom, setZoom] = useState(0.0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleTakePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync();
      if (photo?.uri) {
        setSelectedImage(photo.uri);
      }
    } catch (error) {
      console.error("Failed to take picture:", error);
    }
  };

  const handlePinchGesture = (event) => {
    const { scale, velocity } = event.nativeEvent;

    let newZoom =
      velocity > 0
        ? zoom + scale * velocity * (Platform.OS === "ios" ? 0.005 : 25)
        : zoom -
          scale * Math.abs(velocity) * (Platform.OS === "ios" ? 0.005 : 50);

    newZoom = Math.max(0, Math.min(newZoom, 1));
    setZoom(newZoom);
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
    <GestureHandlerRootView style={styles.container}>
      {selectedImage ? (
        <>
          <Image source={{ uri: selectedImage }} style={styles.fullImage} />
          <View style={styles.overlayButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.analyzeButton}
              onPress={() => console.log("Analyze image:", selectedImage)}
            >
              <Text style={styles.analyzeText}>Analyze</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <PinchGestureHandler onGestureEvent={handlePinchGesture}>
          <View style={{ flex: 1 }}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={cameraFacing}
              flash={flashMode}
              zoom={zoom}
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
                  iosName={
                    flashMode === "off" ? "bolt.slash.fill" : "bolt.fill"
                  }
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
                    setCameraFacing((prev) =>
                      prev === "back" ? "front" : "back"
                    )
                  }
                  width={40}
                  height={40}
                />
              </View>

              {/* 🖼️ Gallery Picker */}
              <GalleryComponent
                onImageSelected={(uri) => setSelectedImage(uri)}
              />
              <BellButton />

              {/* 📸 Capture button */}
              <CaptureButton handleTakePicture={handleTakePicture} />
            </CameraView>
          </View>
        </PinchGestureHandler>
      )}
    </GestureHandlerRootView>
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
  fullImage: {
    width: screen.width,
    height: screen.height,
    resizeMode: "cover",
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
  overlayButtons: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  analyzeButton: {
    backgroundColor: "#007aff",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  cancelText: {
    color: "#000",
    fontSize: 16,
  },
  analyzeText: {
    color: "#fff",
    fontSize: 16,
  },
});
