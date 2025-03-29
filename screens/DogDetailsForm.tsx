import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Props {
  dogInfo: {
    name: string;
    gender: string;
  };
  setDogInfo: (info: any) => void;
  onBack: () => void;
  onComplete: () => void;
}

const DogDetailsForm: React.FC<Props> = ({
  dogInfo,
  setDogInfo,
  onBack,
  onComplete,
}) => {
  const [name, setName] = useState(dogInfo.name || "");
  const [gender, setGender] = useState(dogInfo.gender || "");

  const handleNext = () => {
    setDogInfo((prev: any) => ({ ...prev, name, gender }));
    onComplete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Complete this to finish your dog's profile!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.editText}>
        <Text style={{ color: "#007aff", fontFamily: "Figtree-Regular" }}>
          Edit
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={onBack}>
          <Text style={styles.secondaryText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleNext}>
          <Text style={styles.primaryText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DogDetailsForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: "Figtree-Regular",
    fontSize: 15,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  editText: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryBtn: {
    backgroundColor: "#007aff",
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
    fontWeight: "600",
    fontFamily: "Figtree-Regular",
  },
  secondaryText: {
    color: "#333",
    fontFamily: "Figtree-Regular",
  },
});
