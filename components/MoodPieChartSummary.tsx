import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Menu, Button } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width - 40;

const moods = ["Happy", "Sad", "Calm", "Anxious", "Energetic"];
const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
const filters = ["This Week", "This Month", "This Year", "All Time"];

const dummyData = {
  "This Week": [
    { label: "04/15", values: [2, 4, 3, 1, 5] },
    { label: "04/16", values: [3, 3, 4, 2, 4] },
    { label: "04/17", values: [4, 2, 2, 3, 3] },
  ],
  "This Month": [
    { label: "Week 1", values: [2, 3, 3, 2, 3] },
    { label: "Week 2", values: [4, 2, 2, 4, 3] },
    { label: "Week 3", values: [3, 4, 3, 2, 4] },
    { label: "Week 4", values: [5, 1, 4, 3, 2] },
    { label: "Week 5", values: [3, 3, 3, 3, 3] },
  ],
  "This Year": [
    { label: "Jan", values: [3, 2, 4, 3, 3] },
    { label: "Feb", values: [2, 3, 2, 2, 4] },
    { label: "Mar", values: [4, 2, 5, 1, 3] },
    { label: "Apr", values: [3, 3, 3, 3, 3] },
    { label: "May", values: [4, 4, 2, 2, 2] },
  ],
  "All Time": [
    { label: "2022", values: [2, 2, 2, 2, 2] },
    { label: "2023", values: [3, 3, 3, 3, 3] },
    { label: "2024", values: [4, 4, 4, 4, 4] },
  ],
};

const SingleMoodLineChart = () => {
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const [menuVisible, setMenuVisible] = useState(false);

  const labels = dummyData[selectedFilter].map((entry) => entry.label);
  const moodData = dummyData[selectedFilter].map(
    (entry) => entry.values[selectedMoodIndex]
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Mood Trends</Text>

      {/* Mood Selector */}
      <View style={styles.segmentContainer}>
        {moods.map((mood, index) => (
          <Pressable
            key={mood}
            onPress={() => setSelectedMoodIndex(index)}
            style={[
              styles.segmentButton,
              selectedMoodIndex === index && styles.segmentSelected,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                selectedMoodIndex === index && styles.segmentTextSelected,
              ]}
            >
              {mood}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Filter Dropdown */}
      <View style={styles.headerRow}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              onPress={() => setMenuVisible(true)}
              mode="text"
              labelStyle={styles.dropdownText}
              contentStyle={styles.dropdownButtonContent}
              uppercase={false}
              icon={() => (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={16}
                  color="#888"
                />
              )}
            >
              {selectedFilter}
            </Button>
          }
          contentStyle={styles.menuContent}
        >
          {filters.map((option) => (
            <Menu.Item
              key={option}
              onPress={() => {
                setSelectedFilter(option);
                setMenuVisible(false);
              }}
              title={option}
              titleStyle={[
                styles.dropdownItemText,
                option === selectedFilter && {
                  fontWeight: "bold",
                  color: "#000",
                },
              ]}
              style={styles.dropdownItem}
            />
          ))}
        </Menu>
      </View>

      {/* Line Chart */}
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: moodData,
              color: () => colors[selectedMoodIndex],
              strokeWidth: 2,
              withDots: false,
            },
          ],
        }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 1,
          color: () => colors[selectedMoodIndex],
          labelColor: () => "#666",
          propsForDots: { r: "0" },
          propsForBackgroundLines: {
            stroke: "transparent",
          },
        }}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        bezier
        style={{ marginTop: 10, borderRadius: 16 }}
      />
    </View>
  );
};

export default SingleMoodLineChart;

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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
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
    paddingVertical: 6,
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#888",
  },
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    padding: 4,
    marginBottom: 10,
    alignSelf: "center",
  },
  segmentButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  segmentSelected: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  segmentText: {
    color: "#666",
    fontWeight: "500",
    fontSize: 14,
  },
  segmentTextSelected: {
    color: "#000",
    fontWeight: "600",
  },
});
