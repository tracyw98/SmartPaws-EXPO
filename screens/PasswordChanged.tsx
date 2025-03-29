import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PasswordChanged: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require("../assets/back.png")} style={styles.backIcon} />
      </TouchableOpacity>

      {/* ✅ Success Message */}
      <Text style={styles.title}>Password changed</Text>
      <Text style={styles.subtitle}>
        Your password has been changed successfully
      </Text>

      {/* 🔵 Back to Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginButtonText}>Back to login</Text>
      </TouchableOpacity>
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  /* 🔙 Back Button */
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  /* ✅ Text Styles */
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },

  /* 🔵 Login Button */
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#3F90F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFF",
  },
});

export default PasswordChanged;
