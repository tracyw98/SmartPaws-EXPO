import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // ✅ Import navigation

const SignupScreen: React.FC = () => {
  const navigation = useNavigation(); // ✅ Initialize navigation

  return (
    <View style={styles.container}>
      {/* ✅ Background Overlay */}
      <View style={styles.backgroundOverlay} />

      {/* ✅ Illustration (Manually Adjustable) */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../assets/corgi.png")}
          style={styles.illustration}
        />
      </View>

      {/* ✅ Title & Subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>
          Create an account to access personalized analytics for your pup!
        </Text>
      </View>

      {/* ✅ Buttons (Manually Adjustable) */}
      <View style={styles.buttonsContainer}>
        {/* Continue with Google */}
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../assets/googlelogo.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Continue with Apple */}
        <TouchableOpacity style={styles.appleButton}>
          <Image
            source={require("../assets/applelogo.png")}
            style={styles.icon}
          />
          <Text style={[styles.buttonText, { color: "#FFF" }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>

        {/* Continue with Email (Now Navigates to SignUp1) */}
        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => navigation.navigate("SignUp1")} // ✅ Navigate to SignUp1
        >
          <Image source={require("../assets/email.png")} style={styles.icon} />
          <Text style={styles.buttonText}>Continue with Email</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Log In Link (Now Navigates to Login1) */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login1")} // ✅ Navigate to Login1
          >
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
};

// ✅ Styles (Unchanged)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  backgroundOverlay: {
    position: "absolute",
    top: 66,
    left: 10,
    right: 10,
    height: "81%",
    backgroundColor: "rgba(63, 145, 245, 0.24)",
    borderRadius: 30,
  },

  illustrationContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    width: "100%",
  },
  illustration: {
    width: "100%",
    height: 390,
    resizeMode: "stretch",
  },

  textContainer: {
    position: "absolute",
    top: 445,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  buttonsContainer: {
    position: "absolute",
    top: 560,
    width: "98%",
    alignItems: "center",
  },
  googleButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 10,
  },
  appleButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#000",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 10,
  },
  emailButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: "contain",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#000",
  },

  footerContainer: {
    position: "absolute",
    bottom: 55,
  },
  footerText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#666",
  },
  loginLink: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#0451FA",
  },
});

export default SignupScreen;
