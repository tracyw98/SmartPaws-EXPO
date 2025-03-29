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
import * as Notifications from "expo-notifications";

const OnboardingScreen3 = () => {
  const navigation = useNavigation();
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      await new Promise((res) => setTimeout(res, 2000)); // Wait 2s
      const settings = await Notifications.requestPermissionsAsync();

      if (
        settings.granted ||
        settings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED
      ) {
        setPermissionGranted(true);
      } else {
        Alert.alert(
          "Notification Permission",
          "Please enable notifications to get helpful reminders for your dog's well-being.",
          [{ text: "OK" }]
        );
      }
    };

    requestNotificationPermission();
  }, []);

  const handleNext = () => {
    if (permissionGranted) {
      navigation.navigate("OnboardingScreen4");
    } else {
      Alert.alert(
        "Permission Needed",
        "Notifications are required to continue.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/dog-bell.png")} style={styles.image} />
      <Text style={styles.title}>Turn on notifications</Text>
      <Text style={styles.body}>
        Turn on notifications for reminders to enhance the accuracy of your
        dog's mood analysis.
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

export default OnboardingScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },

  image: {
    width: 400, // ✅ Keeps the dog image size the same
    height: 500, // ✅ Ensures proper scaling
    resizeMode: "contain",
    marginTop: -80,
    marginBottom: 10, // ✅ Slight adjustment to prevent spacing issues
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 15, // ✅ Moves title up
    marginTop: -50, // ✅ Moves title higher to make more space
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
