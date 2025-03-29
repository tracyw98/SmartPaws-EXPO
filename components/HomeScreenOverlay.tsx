import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import FastImage from "react-native-fast-image";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = height * 0.65;

const slides = [
  {
    image: require("../assets/LetsGetStartedDog.png"),
    title: "Follow These Steps for the Best Results",
    description: "Snap a photo to begin building a profile!",
    customStyles: {
      width: 280,
      height: 300,
      marginBottom: 0,
      marginTop: -150,
    },
  },
  {
    image: require("../assets/TakeDogPhoto.png"),
    title: "Frame Your Dog Properly",
    description: "Ensure you take a photo of your entire dog in the frame.",
    customStyles: {
      width: 320,
      height: 220,
      marginBottom: 15,
      marginTop: -90,
    },
  },
  {
    image: require("../assets/DogCouch.png"),
    title: "Use an Object for Size Reference",
    description: "Place an object next to your dog for better size accuracy.",
    customStyles: {
      width: 240,
      height: 240,
      marginBottom: 12,
      marginTop: -100,
    },
  },
  {
    image: require("../assets/SimpleBell.png"),
    title: "Tap the Bell for Attention",
    description: "Use a bell to capture your dog’s full attention.",
    customStyles: {
      width: 210,
      height: 210,
      marginBottom: 18,
      marginTop: -80,
    },
  },
];

const HomeScreenOverlay = ({ visible, onDismiss }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / CARD_WIDTH);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image
        source={item.image}
        style={[styles.image, item.customStyles]}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <FlatList
            ref={flatListRef}
            data={slides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            getItemLayout={(_, index) => ({
              length: CARD_WIDTH,
              offset: CARD_WIDTH * index,
              index,
            })}
          />

          <View style={styles.pagination}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, currentIndex === i && styles.activeDot]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
            <Text style={styles.dismissText}>Ok, got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    width: CARD_WIDTH,
    height: height * 0.6,
    backgroundColor: "#FFF",
    borderRadius: 15,
    overflow: "hidden",
  },
  slide: {
    width: CARD_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    // Base styles are overridden by individual customStyles
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    maxWidth: "90%",
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    color: "#666",
    maxWidth: "90%",
  },
  pagination: {
    position: "absolute",
    bottom: 90,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#0451FA",
  },
  dismissButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#0451FA",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  dismissText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
};

export default HomeScreenOverlay;
