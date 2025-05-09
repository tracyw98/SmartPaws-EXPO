import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;

const Login1: React.FC = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>Log in</Text>

            <Text style={styles.subtitle}>
              Log in to access personalized insights and data tailored just for
              your pup!
            </Text>

            <Text style={styles.label}>Email address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="helloworld@gmail.com"
                placeholderTextColor="#999"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor="#999"
                autoCapitalize="none"
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!isPasswordVisible)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.iconTouchable}
              >
                <Image
                  source={
                    isPasswordVisible
                      ? require("../assets/eye-off.png")
                      : require("../assets/eye.png")
                  }
                  style={styles.iconRight}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgetPassword")}
              style={styles.forgotPasswordTouchable}
              hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>Or Log in with</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity style={styles.googleButton}>
              <Image
                source={require("../assets/googlelogo.png")}
                style={styles.iconLeft}
              />
              <Text style={styles.buttonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.appleButton}>
              <Image
                source={require("../assets/applelogo.png")}
                style={styles.iconLeft}
              />
              <Text style={[styles.buttonText, { color: "#FFF" }]}>
                Continue with Apple
              </Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp1")}>
                <Text style={styles.footerText}>
                  Don’t have an account?{" "}
                  <Text style={styles.signupLink}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
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
  scrollWrapper: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 80 : 60,
    paddingBottom: 60,
  },
  title: {
    fontSize: 26,
    fontFamily: "Poppins-Bold",
    color: "#000",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#666",
    width: "100%",
    marginBottom: 36,
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#000",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: "#000",
  },
  iconTouchable: {
    padding: 6,
  },
  iconRight: {
    width: 22,
    height: 22,
    tintColor: "#666",
  },
  forgotPasswordTouchable: {
    alignSelf: "flex-end",
  },
  forgotPassword: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#0451FA",
    textAlign: "right",
    marginBottom: 70,
  },
  loginButton: {
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
  loginButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFF",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
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
    marginHorizontal: 12,
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
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
  },
  appleButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  iconLeft: {
    width: 24,
    height: 24,
    marginRight: 15,
    resizeMode: "contain",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#000",
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "center",
  },
  signupLink: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#0451FA",
  },
});

export default Login1;
