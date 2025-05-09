import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { Image } from "expo-image";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");
const imageWidth = screenWidth * 1.1;
const imageHeight = imageWidth * 1.1;

const OnboardingScreen3 = () => {
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    rotation.value = withRepeat(withTiming(-10, { duration: 800 }), -1, true);
  }, []);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      await Notifications.requestPermissionsAsync();
    };
    const timer = setTimeout(requestNotificationPermission, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    navigation.navigate("Onboarding4");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>smartpaws</Text>

      <View style={styles.imageWrapper}>
        <Svg
          style={styles.svg}
          viewBox="0 0 1005 628"
          preserveAspectRatio="xMidYMid meet"
        >
          <Path
            d="M838.925 97.43C607.89 263.485 348.246 101.666 247.303 0C60.6823 235.103 -200.587 662.736 247.303 492.445C695.193 322.154 903.676 511.861 951.931 628C1010.53 381.954 1069.96 -68.6246 838.925 97.43Z"
            fill="#FFE267"
          />
        </Svg>

        <Animated.View style={[animatedStyle, styles.animatedImage]}>
          <Image
            source={require("../assets/dog-bell.png")}
            onLoadEnd={() => setImageLoaded(true)}
            style={{ width: imageWidth, height: imageHeight }}
            contentFit="contain"
            transition={300}
          />
        </Animated.View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>

      <Text style={styles.title}>Turn on notifications</Text>
      <Text style={styles.body}>
        Turn on notifications for reminders to enhance the accuracy of your
        dog’s mood analysis.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  logo: {
    fontSize: 22,
    fontFamily: "Nunito-Bold",
    marginBottom: 10,
    marginTop: 10,
  },
  imageWrapper: {
    width: imageWidth,
    height: imageHeight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -50,
    overflow: "hidden",
  },
  svg: {
    position: "absolute",
    top: "10%", // Makes it consistent on all screen sizes
    left: "-35%",
    width: "150%",
    height: "100%",
    zIndex: -1,
  },
  animatedImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    gap: 8,
  },
  dot: {
    width: 14,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#D3D3D3",
  },
  activeDot: {
    backgroundColor: "#3B82F6",
    width: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  body: {
    fontSize: 12,
    fontFamily: "Figtree-Regular",
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 3,
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 70,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  backButtonText: {
    color: "gray",
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  nextButton: {
    backgroundColor: "#0451FA",
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 13,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
});
