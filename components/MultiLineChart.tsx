import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Menu, Button } from "react-native-paper";
import { LineChart as GiftedLineChart } from "react-native-gifted-charts";
import { MaterialIcons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

const timeframes = ["W", "M", "6M", "Y", "ALL"];
const moods = ["Happy", "Sad", "Energetic", "Anxious", "Calm"];
const colors = ["#FF6384", "#36A2EB", "#9966FF", "#4BC0C0", "#FFCE56"];

const dummyData = {
  W: [
    { label: "M", values: [5, 3, 4, 1, 5] },
    { label: "T", values: [3, 4, 3, 2, 4] },
    { label: "W", values: [4, 2, 2, 3, 3] },
    { label: "T", values: [null, null, null, null, null] },
    { label: "F", values: [null, null, null, null, null] },
    { label: "S", values: [null, null, null, null, null] },
    { label: "S", values: [null, null, null, null, null] },
  ],
  M: [
    { label: "W1", values: [2, 3, 3, 2, 3] },
    { label: "W2", values: [4, 2, 2, 4, 3] },
    { label: "W3", values: [3, 4, 3, 2, 4] },
    { label: "W4", values: [5, 1, 4, 3, 2] },
    { label: "W5", values: [3, 3, 3, 3, 3] },
  ],
  "6M": [
    { label: "Jan", values: [3, 2, 4, 3, 3] },
    { label: "Feb", values: [2, 3, 2, 2, 4] },
    { label: "Mar", values: [4, 2, 5, 1, 3] },
    { label: "Apr", values: [3, 3, 3, 3, 3] },
    { label: "May", values: [4, 4, 2, 2, 2] },
    { label: "Jun", values: [3, 3, 4, 3, 2] },
  ],
  Y: [
    { label: "Jan", values: [3, 2, 4, 3, 3] },
    { label: "Feb", values: [2, 3, 2, 2, 4] },
    { label: "Mar", values: [4, 2, 5, 1, 3] },
    { label: "Apr", values: [3, 3, 3, 3, 3] },
    { label: "May", values: [4, 4, 2, 2, 2] },
  ],
  ALL: [
    { label: "2022", values: [2, 2, 2, 2, 2] },
    { label: "2023", values: [3, 3, 3, 3, 3] },
    { label: "2024", values: [4, 4, 4, 4, 4] },
  ],
};

const calculateFontSize = () => {
  const baseFontSize = 10;
  const scale = screenWidth / 375;
  return Math.min(Math.max(baseFontSize * scale, 10), 16);
};

const SingleMoodLineChart = () => {
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(0);
  const [selectedTimeframe, setSelectedTimeframe] = useState("W");
  const [menuVisible, setMenuVisible] = useState(false);
  const moodFontSize = calculateFontSize();

  const currentData = dummyData[selectedTimeframe];
  const spacing = (screenWidth - 120) / (currentData.length - 1); // evenly fill chart

  const rawData = currentData.map((entry) => ({
    value: entry.values[selectedMoodIndex] ?? 0,
    date: entry.label,
    labelComponent: () => (
      <View style={{ width: spacing, alignItems: "center" }}>
        <Text style={{ fontSize: 12, color: "#999", textAlign: "center" }}>
          {entry.label}
        </Text>
      </View>
    ),
  }));

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Mood Trends</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              onPress={() => setMenuVisible(true)}
              mode="text"
              contentStyle={styles.dropdownButtonContent}
              uppercase={false}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text style={styles.dropdownText}>
                {moods[selectedMoodIndex]}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={14}
                color="#888"
                style={{ marginLeft: 4, marginBottom: -9 }}
              />
            </Button>
          }
          contentStyle={styles.menuContent}
        >
          {moods.map((option, index) => (
            <Menu.Item
              key={option}
              onPress={() => {
                setSelectedMoodIndex(index);
                setMenuVisible(false);
              }}
              title={option}
              titleStyle={[
                styles.dropdownItemText,
                index === selectedMoodIndex && {
                  fontWeight: "bold",
                  color: "#000",
                },
              ]}
              style={styles.dropdownItem}
            />
          ))}
        </Menu>
      </View>

      {/* TIMEFRAME SELECTOR */}
      <View style={styles.segmentContainer}>
        {timeframes.map((frame) => (
          <Pressable
            key={frame}
            onPress={() => setSelectedTimeframe(frame)}
            style={[
              styles.segmentButton,
              selectedTimeframe === frame && styles.segmentSelected,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                { fontSize: moodFontSize },
                selectedTimeframe === frame && styles.segmentTextSelected,
              ]}
            >
              {frame}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* CHART */}
      <GiftedLineChart
        data={rawData}
        areaChart
        curved
        width={screenWidth - 40}
        height={220}
        spacing={spacing}
        maxValue={5}
        noOfSections={5}
        hideDataPoints
        color={colors[selectedMoodIndex]}
        thickness={2}
        startFillColor={colors[selectedMoodIndex]}
        endFillColor={colors[selectedMoodIndex]}
        startOpacity={0.4}
        endOpacity={0.05}
        initialSpacing={0}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{
          color: "#999",
          fontSize: 10,
          marginTop: 10,
        }}
        yAxisTextStyle={{
          color: "#999",
          fontSize: 12,
          marginRight: 0,
        }}
        rulesColor="transparent"
        pointerConfig={{
          pointerStripHeight: 180,
          pointerColor: colors[selectedMoodIndex],
          pointerStripWidth: 0.5,
          showPointerStrip: false,
          radius: 5,
          pointerLabelWidth: 100,
          pointerLabelHeight: 60,
          activatePointersOnLongPress: false,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (items) => (
            <View
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#fff",
                borderRadius: 8,
                paddingHorizontal: 5,
                paddingVertical: 6,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                alignItems: "center",
                marginTop: -30,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 10,
                  color: "#000",
                  marginBottom: 2,
                }}
              >
                {items[0].value}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: "#999",
                }}
              >
                mood score
              </Text>
            </View>
          ),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  dropdownText: {
    fontSize: 14,
    color: "#888",
  },
  dropdownButtonContent: {
    paddingHorizontal: 6,
  },
  menuContent: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    minWidth: 140,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  dropdownItem: {
    backgroundColor: "#fff",
    paddingVertical: 8,
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#888",
  },
  segmentContainer: {
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#EDEDED",
    marginBottom: 12,
    overflow: "hidden",
    paddingHorizontal: 2,
    paddingVertical: 2,
    justifyContent: "space-between",
  },
  segmentButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 6,
  },
  segmentSelected: {
    backgroundColor: "#fff",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
  },
  segmentText: {
    fontWeight: "500",
    color: "#666",
    textAlign: "center",
  },
  segmentTextSelected: {
    color: "#000",
    fontWeight: "600",
  },
});

export default SingleMoodLineChart;
