import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/RootStackParamList";
import useOnboarding from "../hooks/useOnboarding";
import { useNavigation } from "@react-navigation/native";

// Type navigation correctly
type LoadingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoadingScreen"
>;

const LoadingScreen = () => {
  const navigation = useNavigation<LoadingScreenNavigationProp>();
  const { hasSeenOnboarding } = useOnboarding();

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (hasSeenOnboarding === null) return;

      // Wait 1.4 seconds before navigating
      setTimeout(async () => {
        const userToken = await AsyncStorage.getItem("userToken");

        if (!hasSeenOnboarding) {
          navigation.replace("OnboardingScreen1");
        } else if (userToken) {
          navigation.replace("Home");
        } else {
          navigation.replace("SignIn");
        }
      }, 2500); // Delay of 1.4 seconds
    };

    checkAuthStatus();
  }, [hasSeenOnboarding]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/pawicon.png")} style={styles.logo} />
      {/* 🚨 Removed <ActivityIndicator> completely */}
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
