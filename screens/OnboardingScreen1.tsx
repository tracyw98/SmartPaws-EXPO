import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Placeholder for Video */}
      <View style={styles.videoPlaceholder}>
        <Text style={styles.videoText}>Your Video/GIF Here</Text>
      </View>

      {/* Onboarding Text */}
      <Text style={styles.title}>Unlock AI-driven dog insights</Text>
      <Text style={styles.body}>
        Harness the power of AI to understand your dog like never before. Take a
        photo or video to scan for breed, emotional state, and behavior patterns
        for insights over time.
      </Text>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("OnboardingScreen2")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  videoPlaceholder: {
    width: "90%",
    height: 380,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 15,
    marginBottom: 30,
  },
  videoText: {
    fontSize: 16,
    color: "#888",
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
  button: {
    position: "absolute", // ✅ Position it absolutely
    bottom: 80, // ✅ Distance from bottom
    right: 40, // ✅ Distance from right
    backgroundColor: "#0451FA",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Inter-Medium", // ✅ Correct font
  },
});
