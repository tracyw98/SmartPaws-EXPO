import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen4 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* ✅ Dog Image with Adjustable Size */}
      <Image
        source={require("../assets/dog-and-statistics.png")}
        style={{
          width: 320,
          height: 380,
          resizeMode: "contain",
          marginTop: -70,
        }}
      />

      {/* ✅ Title */}
      <Text style={styles.title}>Setting up your account</Text>

      {/* ✅ Subtitle */}
      <Text style={styles.subtitle}>
        Set up an account to track your pup’s mood, behavior, and breed
        insights—personalized just for you!
      </Text>

      {/* ✅ Steps with Lines */}
      <View style={styles.stepsContainer}>
        <View style={styles.stepWrapper}>
          <View style={styles.stepRow}>
            <Image
              source={require("../assets/number-one-circle.png")}
              style={styles.stepIcon}
            />
            <Text style={styles.stepText}>Sign up for access</Text>
          </View>
          <View style={styles.line} />
        </View>

        <View style={styles.stepWrapper}>
          <View style={styles.stepRow}>
            <Image
              source={require("../assets/number-two-circle.png")}
              style={styles.stepIcon}
            />
            <Text style={styles.stepText}>Verify account with code</Text>
          </View>
          <View style={styles.line} />
        </View>

        <View style={styles.stepWrapper}>
          <View style={styles.stepRow}>
            <Image
              source={require("../assets/number-three-circle.png")}
              style={styles.stepIcon}
            />
            <Text style={styles.stepText}>
              Take a photo of your pet to fill out pet profile
            </Text>
          </View>
        </View>
      </View>

      {/* ✅ Buttons */}
      <View style={styles.buttonRow}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Finish Button */}
        <TouchableOpacity
          style={styles.finishButton}
          onPress={() => navigation.replace("SignUpMain")} // ✅ Navigate to SignUp
        >
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 320,
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "400",
  },
  stepsContainer: {
    width: "100%",
  },
  stepWrapper: {
    marginBottom: 10,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  stepText: {
    fontSize: 12,
    fontWeight: "400",
  },
  line: {
    height: 1,
    backgroundColor: "#C4C4C4",
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
  },

  /** 📌 Adjust the button positioning */
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 80,
  },

  /** 📌 Back button */
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  backButtonText: {
    color: "gray",
    fontSize: 13,
  },

  /** 📌 Finish button */
  finishButton: {
    backgroundColor: "#0451FA",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 18,
  },
  finishButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
  },
});
