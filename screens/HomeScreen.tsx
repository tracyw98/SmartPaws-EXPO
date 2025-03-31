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
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  CameraProps,
} from "react-native-vision-camera";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Reanimated, {
  useSharedValue,
  interpolate,
  Extrapolation,
  useAnimatedProps,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import IconButton from "@/components/IconButton";
import CaptureButton from "@/components/CaptureButton";
import GalleryComponent from "@/components/GalleryComponent";
import BellButton from "@/components/BellButton";
import ZoomSwitch from "@/components/ZoomSwitch"; // ✅ ADDED

// 📸 Make Camera zoomable with reanimated
Reanimated.addWhitelistedNativeProps({ zoom: true });
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

const screen = Dimensions.get("window");

export default function HomeScreen() {
  const cameraRef = useRef<Camera>(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const device = useCameraDevice(cameraFacing);

  // 🔁 Zoom handling with shared value
  const zoom = useSharedValue(1);
  const zoomOffset = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      zoomOffset.value = zoom.value;
    })
    .onUpdate((event) => {
      const newZoom = zoomOffset.value * event.scale;
      zoom.value = interpolate(
        newZoom,
        [1, 10],
        [device?.minZoom ?? 1, device?.maxZoom ?? 1],
        Extrapolation.CLAMP
      );
    });

  const animatedProps = useAnimatedProps<CameraProps>(() => ({
    zoom: zoom.value,
  }));

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const handleTakePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePhoto({
        flash: flash === "on" ? "on" : "off",
      });
      if (photo?.path) {
        setSelectedImage("file://" + photo.path);
      }
    } catch (error) {
      console.error("Failed to take picture:", error);
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.permissionContainer}>
        <Text>No camera device found.</Text>
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
        <>
          <GestureDetector gesture={pinchGesture}>
            <View style={{ flex: 1 }}>
              <ReanimatedCamera
                ref={cameraRef}
                style={styles.camera}
                device={device}
                isActive={true}
                photo={true}
                animatedProps={animatedProps}
              />

              <View style={styles.controlsContainer}>
                <IconButton
                  iosName="person.crop.circle"
                  androidName="person-circle-outline"
                  onPress={() => console.log("Go to profile")}
                  width={40}
                  height={40}
                />
                <IconButton
                  iosName={flash === "off" ? "bolt.slash.fill" : "bolt.fill"}
                  androidName={flash === "off" ? "flash-off" : "flash"}
                  onPress={() =>
                    setFlash((prev) => (prev === "off" ? "on" : "off"))
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

                {/* ✅ Zoom Switch below flip camera */}
                {device && <ZoomSwitch zoom={zoom} device={device} />}
              </View>

              <BellButton />
              <CaptureButton handleTakePicture={handleTakePicture} />
            </View>
          </GestureDetector>

          {/* ✅ Gallery placed OUTSIDE GestureDetector to work properly */}
          <GalleryComponent onImageSelected={(uri) => setSelectedImage(uri)} />
        </>
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
