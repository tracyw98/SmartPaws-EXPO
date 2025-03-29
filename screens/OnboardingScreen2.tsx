import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";

const OnboardingScreen2 = () => {
  const navigation = useNavigation();
  const [permissionStatus, setPermissionStatus] = useState<
    "granted" | "denied" | null
  >(null);

  useEffect(() => {
    const requestPermission = async () => {
      await new Promise((res) => setTimeout(res, 2000)); // Delay 2s
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermissionStatus(status as "granted" | "denied");

      if (status !== "granted") {
        Alert.alert(
          "Camera Access Required",
          "To use SmartPaws’ real-time scanning feature, camera access is necessary.",
          [{ text: "OK" }]
        );
      }
    };

    requestPermission();
  }, []);

  const handleNext = () => {
    if (permissionStatus === "granted") {
      navigation.navigate("OnboardingScreen3");
    } else {
      Alert.alert(
        "Permission Required",
        "Please grant camera access to proceed.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/simple-camera.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Enable camera for scans</Text>
      <Text style={styles.body}>
        To scan and analyze your dog in real time, SmartPaws needs access to
        your camera. Without this, the main feature of the app won’t work.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 350,
    height: 380,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 15,
  },
  body: {
    fontSize: 13,
    fontFamily: "Figtree-Regular",
    textAlign: "left",
    color: "#444",
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 80,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  backButtonText: {
    color: "gray",
    fontSize: 13,
    fontFamily: "Inter-Medium",
  },
  nextButton: {
    backgroundColor: "#0451FA",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 18,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Inter-Medium",
  },
});
