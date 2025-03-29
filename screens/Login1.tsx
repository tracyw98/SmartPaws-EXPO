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
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login1: React.FC = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* ✅ Title (Centered & Aligned) */}
        <Text style={styles.title}>Log in</Text>

        {/* ✅ Subtitle (Centered) */}
        <Text style={styles.subtitle}>
          Log in to access personalized insights and data tailored just for your
          pup!
        </Text>

        {/* ✅ Email Input */}
        <Text style={styles.label}>Email address</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="helloworld@gmail.com"
            keyboardType="email-address"
            placeholderTextColor="#999"
          />
        </View>

        {/* ✅ Password Input */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!isPasswordVisible)}
          >
            <Image
              source={require("../assets/eye.png")}
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        {/* ✅ Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        {/* ✅ Log In Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        {/* ✅ Divider (Center-Aligned) */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or Log in with</Text>
          <View style={styles.divider} />
        </View>

        {/* ✅ Social Login Buttons (Properly Centered & Matched with Signup) */}
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

        {/* ✅ Footer - Sign Up Link (Centered & Matched) */}
        <TouchableOpacity onPress={() => navigation.navigate("SignUp1")}>
          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={styles.signupLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

// ✅ Styles (Perfected to Match SignUpMain)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "left",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
  },

  title: {
    fontSize: 26,
    fontFamily: "Poppins-Bold",
    color: "#000",
    textAlign: "left",
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "left", // Ensures text aligns to the left
    alignSelf: "flex-start", // Moves it to the left
    width: "100%", // Ensures it doesn't shrink
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#000",
    alignSelf: "flex-start",
    marginBottom: 5,
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 26,
  },

  input: {
    flex: 1,
    color: "#000",
  },

  iconRight: {
    width: 22,
    height: 22,
    tintColor: "#666",
  },

  forgotPassword: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#0451FA",
    textAlign: "right",
    alignSelf: "flex-end",
    marginBottom: 50,
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
    justifyContent: "center",
    width: "90%",
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

  /* ✅ Fixed Social Login Button Spacing */
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
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 30,
  },

  iconLeft: {
    width: 24,
    height: 24,
    marginRight: 15, // ✅ Extra spacing from text
    resizeMode: "contain",
  },

  buttonText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#000",
  },

  footerText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  signupLink: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "#0451FA",
  },
});

export default Login1;
