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
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // ✅ Import navigation

const ForgetPassword: React.FC = () => {
  const navigation = useNavigation(); // ✅ Initialize navigation

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* ✅ Back Button - Navigates to Login1 */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Login1")}
        >
          <Image
            source={require("../assets/back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        {/* ✅ Title & Subtitle */}
        <Text style={styles.title}>Forgot password?</Text>
        <Text style={styles.subtitle}>
          Please enter the email associated with your account. Check your email
          for the code to reset your password.
        </Text>

        {/* ✅ Email Input */}
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          keyboardType="email-address"
          placeholderTextColor="#A0A0A0"
        />

        {/* ✅ Send Code Button */}
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send code</Text>
        </TouchableOpacity>

        {/* ✅ Log In Link - Navigates to Login1 */}
        <TouchableOpacity onPress={() => navigation.navigate("Login1")}>
          <Text style={styles.footerText}>
            Remember password? <Text style={styles.loginLink}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 150,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
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
    marginBottom: 320,
  },

  sendButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFF",
  },

  footerText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "center",
  },

  loginLink: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#0451FA",
    fontWeight: "bold",
  },
});

export default ForgetPassword;
