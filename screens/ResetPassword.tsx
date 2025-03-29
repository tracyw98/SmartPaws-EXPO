import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const ResetPassword: React.FC = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* ✅ Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Image source={require("../assets/back.png")} style={styles.backIcon} />
      </TouchableOpacity>

      {/* ✅ Title & Subtitle */}
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>Please reset your password</Text>

      {/* ✅ Password Fields */}
      <Text style={styles.label}>New password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="must be 8 characters"
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          <Image source={require("../assets/eye.png")} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm new password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="repeat password"
          secureTextEntry={!isConfirmPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
        >
          <Image source={require("../assets/eye.png")} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      {/* ✅ Reset Password Button */}
      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset password</Text>
      </TouchableOpacity>

      {/* ✅ Footer */}
      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.loginLink}>Log in</Text>
      </Text>
    </View>
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

  /* 📌 Back Button */
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
  /* 📌 Title & Subtitle */
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#000",
    textAlign: "left",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#666",
    marginBottom: 30,
  },

  /* 📌 Input Fields */
  label: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#000",
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: "#666",
  },

  /* 📌 Reset Password Button */
  resetButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#3F90F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 290,
    marginTop: 12,
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFF",
  },

  /* 📌 Footer */
  footerText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "center",
  },
  loginLink: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#3F90F5",
  },
});

export default ResetPassword;
