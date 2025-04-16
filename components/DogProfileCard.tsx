import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import PopupModal from "./PopupModal"; // ✅ adjust path if needed

interface DogProfile {
  id: string;
  name: string;
  breed: string;
  imageUri: string;
}

interface Props {
  profile: DogProfile;
  onPressMenu?: () => void;
}

export default function DogProfileCard({ profile }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const handleDelete = () => {
    // TODO: Call backend or state logic to delete the dog
    console.log("🐶 Deleted:", profile.id);
    setConfirmDeleteVisible(false);
    setMenuVisible(false);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: profile.imageUri }} style={styles.image} />

      <View style={styles.infoWrapper}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.breed}>{profile.breed}</Text>
        </View>

        {/* ⋯ button */}
        <TouchableOpacity
          onPress={() => setMenuVisible((prev) => !prev)}
          style={styles.menuButton}
        >
          <Text style={styles.menuText}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {menuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setMenuVisible(false);
              // TODO: navigate to change name
              console.log("🔤 Change name clicked for", profile.id);
            }}
          >
            <Text style={styles.dropdownText}>Change Name</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setConfirmDeleteVisible(true);
              setMenuVisible(false);
            }}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Delete Confirmation Modal */}
      <PopupModal
        visible={confirmDeleteVisible}
        type="warning"
        title="Delete Dog"
        message={`Are you sure you want to delete ${profile.name}?`}
        onClose={() => setConfirmDeleteVisible(false)}
        onProceed={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: "relative",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginRight: 16,
  },
  infoWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    flexShrink: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: "Fredoka-SemiBold",
    color: "#222",
    marginBottom: 2,
  },
  breed: {
    fontSize: 14,
    fontFamily: "Fredoka-Regular",
    color: "#666",
  },
  menuButton: {
    alignSelf: "flex-start",
    marginTop: 2,
    paddingHorizontal: 6,
  },
  menuText: {
    fontSize: 20,
    color: "#aaa",
  },
  dropdown: {
    position: "absolute",
    right: 12,
    top: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 6,
  },
  dropdownText: {
    fontSize: 15,
    fontFamily: "Fredoka-Regular",
    color: "#222",
  },
  deleteText: {
    fontSize: 15,
    fontFamily: "Fredoka-Regular",
    color: "#ff3b30", // iOS-style red
  },
});
