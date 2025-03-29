import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";

interface Props {
  dogInfo: {
    breed: string;
    size: string;
    age: string;
    color: string;
  };
  onNext: () => void;
  onEdit: () => void;
}

const DogResultSummary: React.FC<Props> = ({ dogInfo, onNext, onEdit }) => {
  const [showImage, setShowImage] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowImage(true), 800);
    setTimeout(() => setShowResults(true), 1600);
    setTimeout(() => setShowConfetti(true), 2000);
  }, []);

  return (
    <View style={styles.container}>
      {showImage && (
        <Image
          source={require("../assets/dog-winking.png")}
          style={styles.dogImage}
        />
      )}

      {showResults && (
        <>
          <Text style={styles.title}>We got your dog’s results!</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>
              Breed: <Text style={styles.value}>{dogInfo.breed}</Text>
            </Text>
            <Text style={styles.label}>
              Size: <Text style={styles.value}>{dogInfo.size}</Text>
            </Text>
            <Text style={styles.label}>
              Age: <Text style={styles.value}>{dogInfo.age}</Text>
            </Text>
            <Text style={styles.label}>
              Colour: <Text style={styles.value}>{dogInfo.color}</Text>
            </Text>
          </View>

          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.secondaryBtn}>
              <Text style={styles.secondaryText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn} onPress={onNext}>
              <Text style={styles.primaryText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {showConfetti && (
        <LottieView
          source={require("../assets/confetti.json")}
          autoPlay
          loop={false}
          style={styles.confetti}
        />
      )}
    </View>
  );
};

export default DogResultSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  dogImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: -10,
  },
  title: {
    fontSize: 23,
    fontFamily: "Fredoka-SemiBold",
    marginBottom: 60,
    textAlign: "center",
    color: "#1a1a1a",
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    fontFamily: "Fredoka-Regular",
    marginBottom: 8,
    color: "#333",
  },
  value: {
    fontFamily: "Fredoka-SemiBold",
    color: "#0050C8",
  },
  edit: {
    textAlign: "right",
    color: "#007aff",
    fontFamily: "Inter-Regular",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryBtn: {
    backgroundColor: "#0451FA",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  secondaryBtn: {
    backgroundColor: "#dbe4f0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  primaryText: {
    color: "#fff",
    fontFamily: "Inter-Regular",
  },
  secondaryText: {
    color: "#333",
    fontFamily: "Inter-Regular",
  },
  confetti: {
    position: "absolute",
    width: 1000,
    height: 1000,
    top: 0,
    alignSelf: "center",
    zIndex: 10,
  },
});
