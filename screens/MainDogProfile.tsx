import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import MoodPieChartSummary from "../components/MoodPieChartSummary"; // ✅ adjust path if needed

const MainDogProfile = () => {
  const dog = {
    name: "Dusty",
    breed: "Siberian Husky",
    imageUri: null,
    weight: "44 lbs",
    age: "4 years old",
    color: "Gray/Black",
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {/* Profile Section (No Background) */}
      <View style={styles.profileCard}>
        <Image
          source={
            dog.imageUri ? { uri: dog.imageUri } : require("../assets/paw.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{dog.name}</Text>
        <Text style={styles.breed}>{dog.breed}</Text>
      </View>

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

      {/* Mood Section */}
      <Text style={styles.sectionTitle}>Mood Stats</Text>
      <MoodPieChartSummary />
    </ScrollView>
  );
};

export default MainDogProfile;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 60,
  },
  profileCard: {
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 24,
    borderRadius: 10,
    backgroundColor: "transparent", // 🧼 Removed colored background
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#d3e1ef",
    marginBottom: 15,
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
