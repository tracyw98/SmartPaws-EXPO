import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  visible: boolean;
  title?: string;
  message: string;
  buttonText?: string; // Used only for non-warning types
  onClose: () => void;
  onProceed?: () => void; // Only needed for warning
  type?: "info" | "success" | "warning" | "error";
}

const PopupModal: React.FC<Props> = ({
  visible,
  title = "Notice",
  message,
  buttonText = "OK",
  onClose,
  onProceed,
  type = "info",
}) => {
  const backgroundColor = {
    info: "#fff",
    success: "#fff",
    warning: "#fff",
    error: "#fff",
  }[type];

  const textColor = {
    info: "#222",
    success: "#222",
    warning: "#222",
    error: "#222",
  }[type];

  const isWarning = type === "warning";

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={[styles.modal, { backgroundColor }]}>
          {title && (
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
          )}
          <Text style={[styles.message, { color: textColor }]}>{message}</Text>

          {isWarning ? (
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={[styles.cancelButton]} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.proceedButton]}
                onPress={onProceed}
              >
                <Text style={styles.proceedButtonText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={[styles.button]} onPress={onClose}>
              <Text
                style={[styles.buttonText, { fontFamily: "Figtree-Regular" }]}
              >
                {buttonText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PopupModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.14)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Figtree-Regular",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007aff",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
  },
  proceedButton: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 15,
    fontFamily: "Figtree-Regular",
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Figtree-Regular",
  },
});
