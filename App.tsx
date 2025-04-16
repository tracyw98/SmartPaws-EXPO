import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import MoodPieChartSummary from "./components/MoodPieChartSummary";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <MoodPieChartSummary />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
