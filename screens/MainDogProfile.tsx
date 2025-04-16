import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const MainDogProfile = () => {
  // 🔧 When API is ready: Replace this mock object with real fetched data
  const dog = {
    name: "Dusty", // 🔧 Replace with dog.name from API
    breed: "Siberian Husky", // 🔧 Replace with dog.breed
    imageUri: null, // 🔧 Replace with dog.imageUri (e.g. from CDN or backend)
    weight: "44 lbs", // 🔧 Replace with dog.weight
    age: "4 years old", // 🔧 Replace with dog.age
    color: "Gray/Black", // 🔧 Replace with dog.color
  };

  return (
    <View style={styles.container}>
      {/* Profile Section with Gradient Box */}
      <LinearGradient
        colors={["#E3EDF8", "#F7F9FB"]}
        style={styles.profileCard}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Image
          // 🔧 If using remote URL: source={{ uri: dog.imageUri }}
          source={
            dog.imageUri ? { uri: dog.imageUri } : require("../assets/paw.png") // fallback if no photo from backend
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{dog.name}</Text>
        <Text style={styles.breed}>{dog.breed}</Text>
      </LinearGradient>

      {/* About Section */}
      <Text style={styles.sectionTitle}>About {dog.name}</Text>
      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Ionicons name="barbell-outline" size={18} color="#000" />
          <Text style={styles.infoLabel} numberOfLines={1} adjustsFontSizeToFit>
            {dog.weight}
          </Text>
        </View>
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="calendar" size={18} color="#000" />
          <Text style={styles.infoLabel} numberOfLines={1} adjustsFontSizeToFit>
            {dog.age}
          </Text>
        </View>
        <View style={styles.infoCard}>
          <Feather name="droplet" size={18} color="#000" />
          <Text style={styles.infoLabel} numberOfLines={1} adjustsFontSizeToFit>
            {dog.color}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Mood Stats</Text>
    </View>
  );
};

export default MainDogProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  profileCard: {
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 24,
    borderRadius: 10,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#d3e1ef",
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
  },
  breed: {
    fontSize: 16,
    color: "#5e6b73",
    marginTop: 4,
    textAlign: "center",
    marginBottom: -10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 6,
    textAlign: "center",
  },
});
