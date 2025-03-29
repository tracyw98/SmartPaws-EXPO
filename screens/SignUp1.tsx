import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // ✅ Import useNavigation

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* ✅ Title */}
          <Text style={styles.title}>Create an account</Text>

          {/* ✅ Input Fields */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First name, last name"
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />

          {/* ✅ Password Fields */}
          <Text style={styles.label}>Create a password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Must be 8 characters"
              secureTextEntry={!isPasswordVisible}
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={Keyboard.dismiss}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >
              <Image
                source={require("../assets/eye.png")}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Repeat password"
              secureTextEntry={!isConfirmPasswordVisible}
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={Keyboard.dismiss}
            />
            <TouchableOpacity
              onPress={() =>
                setConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
            >
              <Image
                source={require("../assets/eye.png")}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* ✅ Log In Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>

          {/* ✅ Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or Register with</Text>
            <View style={styles.divider} />
          </View>

          {/* ✅ Social Login Buttons */}
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require("../assets/googlelogo.png")}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Sign up with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appleButton}>
            <Image
              source={require("../assets/applelogo.png")}
              style={styles.icon}
            />
            <Text style={[styles.buttonText, { color: "#FFF" }]}>
              Sign up with Apple
            </Text>
          </TouchableOpacity>

          {/* ✅ Footer - Navigates to Login1 */}
          <TouchableOpacity onPress={() => navigation.navigate("Login1")}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text style={styles.loginLink}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 75,
  },

  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },

  label: {
    fontSize: 13,
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
    marginBottom: 15,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },

  passwordInput: {
    flex: 1,
  },

  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: "#666",
  },

  loginButton: {
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
    marginBottom: 30,
  },

  loginButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFF",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },

  orText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#666",
    marginHorizontal: 10,
  },

  googleButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 20,
  },

  appleButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
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

export default SignUpScreen;
