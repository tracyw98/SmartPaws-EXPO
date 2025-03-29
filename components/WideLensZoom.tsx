import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SymbolView } from "expo-symbols";

interface WideLensButtonProps {
  onPress: () => void;
  visible: boolean;
}

export default function WideLensButton({
  onPress,
  visible,
}: WideLensButtonProps) {
  if (!visible) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <SymbolView
        name="arrow.up.left.and.arrow.down.right"
        size={24}
        tintColor="black"
        fallback={null}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 140,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
