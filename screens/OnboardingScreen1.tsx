import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");
const imageWidth = screenWidth * 1.2;
const imageHeight = imageWidth * 1.2;

const OnboardingScreen1 = () => {
  const navigation = useNavigation();
  const float = useSharedValue(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    float.value = withRepeat(withTiming(-20, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>smartpaws</Text>

      <View style={styles.imageWrapper}>
        <Image
          source={require("../assets/onboarding1phoneprototype.png")}
          style={styles.phone}
          contentFit="contain"
        />
        <Animated.View style={[styles.dogWrapper, animatedStyle]}>
          <Image
            source={require("../assets/onboarding1dog.png")}
            onLoadEnd={() => setImageLoaded(true)}
            style={[styles.dog, { opacity: imageLoaded ? 1 : 0 }]}
            contentFit="contain"
            transition={300}
          />
        </Animated.View>
      </View>

      <Text style={styles.description}>
        Your pup has a lot to say — we translate it.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Onboarding2")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Terms & Conditions + Privacy Policy</Text>
    </View>
  );
};

export default OnboardingScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 60,
    overflow: "hidden",
  },
  logo: {
    fontSize: 22,
    fontFamily: "Nunito-Bold",
    marginBottom: 20,
  },
  imageWrapper: {
    width: imageWidth,
    height: imageHeight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -25,
  },
  phone: {
    width: imageWidth,
    height: imageHeight,
  },
  dogWrapper: {
    position: "absolute",
    top: "23%",
    left: "20%",
    width: "50%",
    height: "50%",
  },
  dog: {
    width: "130%",
    height: "130%",
  },
  description: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#444",
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0451FA",
    paddingVertical: 16,
    paddingHorizontal: 120,
    borderRadius: 16,
    marginBottom: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Inter-Medium",
  },
  footer: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#777",
  },
});
