import React, { createContext, useContext, useState } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";

const ToastContext = createContext({ showToast: (msg: string) => {} });

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState("");
  const [opacity] = useState(new Animated.Value(0));

  const showToast = (msg: string) => {
    setMessage(msg);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }, 2500);
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Animated.View style={[styles.toast, { opacity }]}>
        <Text style={styles.toastText}>{message}</Text>
      </Animated.View>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    zIndex: 1000,
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
  },
});
