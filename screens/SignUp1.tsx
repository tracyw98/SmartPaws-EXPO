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
import { useNavigation } from "@react-navigation/native";

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>Sign Up</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="First name, last name"
              returnKeyType="next"
              autoCapitalize="words"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              returnKeyType="next"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Create a Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Must be 8 characters"
                secureTextEntry={!isPasswordVisible}
                returnKeyType="next"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!isPasswordVisible)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.eyeTouchable}
              >
                <Image
                  source={
                    isPasswordVisible
                      ? require("../assets/eye-off.png")
                      : require("../assets/eye.png")
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Repeat password"
                secureTextEntry={!isConfirmPasswordVisible}
                returnKeyType="done"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() =>
                  setConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.eyeTouchable}
              >
                <Image
                  source={
                    isConfirmPasswordVisible
                      ? require("../assets/eye-off.png")
                      : require("../assets/eye.png")
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>Or Register with</Text>
              <View style={styles.divider} />
            </View>

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

            <TouchableOpacity onPress={() => navigation.navigate("Login1")}>
              <Text style={styles.footerText}>
                Already have an account?{" "}
                <Text style={styles.loginLink}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#000",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: "#000",
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
    color: "#000",
  },
  eyeTouchable: {
    padding: 6,
  },
  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: "#666",
  },
  signUpButton: {
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
    marginBottom: 32,
  },
  signUpButtonText: {
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
    marginBottom: 55,
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
