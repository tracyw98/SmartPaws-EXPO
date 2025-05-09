import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ForgetPassword: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* Scrollable content */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Login1")}
          >
            <Image
              source={require("../assets/back.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          {/* Title & Subtitle */}
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Please enter the email associated with your account. Check your
            email for the code to reset your password.
          </Text>

          {/* Email Input */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
          />

          {/* Send Code Button */}
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send Code</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Fixed Footer */}
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login1")}>
            <Text style={styles.footerText}>
              Remember Password? <Text style={styles.loginLink}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 120 : 100,
    paddingBottom: 150, // space for footer
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 16,
    zIndex: 10,
    padding: 15,
  },
  backIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#000",
    textAlign: "left",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#666",
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#000",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sendButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#0451FA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  sendButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFF",
  },
  footerContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "center",
  },
  loginLink: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#0451FA",
  },
});

export default ForgetPassword;
