import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
} from "react-native";

const ForgetPasswordCode: React.FC = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) =>
    `00:${seconds < 10 ? `0${seconds}` : seconds}`;

  // ✅ Improved Input Handling (Works on iOS)
  const handleChange = (value: string, index: number) => {
    // Allow numbers and empty strings
    if (value !== "" && !/^[0-9]$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Handle focus changes
    if (value) {
      // Move forward
      if (index < 3) inputRefs.current[index + 1]?.focus();
    } else {
      // Move backward
      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      {/* ✅ Back Button (Upper Right) */}
      <TouchableOpacity style={styles.backButton}>
        <Image source={require("../assets/back.png")} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Title Section */}
      <Text style={styles.title}>Please check your email</Text>
      <Text style={styles.subtitle}>
        We’ve sent a code to{" "}
        <Text style={styles.boldText}>helloworld@gmail.com</Text>
      </Text>

      {/* Code Inputs */}
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            autoFocus={index === 0} // ✅ Auto-focus first input
            onChangeText={(value) => handleChange(value, index)}
          />
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      {/* Resend Code */}
      <TouchableOpacity
        disabled={!canResend}
        onPress={() => {
          setTimeLeft(30);
          setCanResend(false);
        }}
      >
        <Text style={[styles.resendText, canResend && styles.resendActive]}>
          {canResend
            ? "Send code again"
            : `Send code again ${formatTime(timeLeft)}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ✅ Keep your existing styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 150,
  },

  /* 📌 Back Button */
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    padding: 15,
  },
  backIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },

  /* 📌 Title */
  title: {
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    color: "#000",
    textAlign: "left",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#666",
    marginBottom: 50,
  },
  boldText: {
    fontFamily: "Inter-Medium", // ✅ Update to Inter-Medium
    color: "#000",
  },

  /* 📌 Code Input */
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  codeInput: {
    width: 75, // Adjusted size
    height: 75,
    borderWidth: 0.5,
    borderColor: "#E0E0E0", // ✅ Light Grey
    borderRadius: 10,
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#000",
    backgroundColor: "#F5F5F5", // ✅ Light grey background
  },

  /* 📌 Verify Button */
  verifyButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#3F90F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  verifyText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFF",
  },

  /* 📌 Resend Code */
  resendText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  resendActive: {
    color: "#3F90F5", // ✅ Blue when enabled
  },
});

export default ForgetPasswordCode;
