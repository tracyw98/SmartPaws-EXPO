// ✅ Full working demo version with embedded scan data for testing
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Menu, Button } from "react-native-paper";
import Svg, { G, Path } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";
import * as d3Shape from "d3-shape";

const filters = [
  "Last Scan",
  "This Week",
  "This Month",
  "This Year",
  "All Time",
];
const screenWidth = Dimensions.get("window").width;
const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

const MoodPieChartBox = () => {
  const [selectedFilter, setSelectedFilter] = useState("All Time");
  const [visible, setVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([0, 0, 0, 0, 0]);
  const [scanCount, setScanCount] = useState(0);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const mockData = [
    {
      timestamp: new Date(),
      happy: 4,
      sad: 2,
      calm: 3,
      anxious: 2,
      energetic: 5,
    },
    {
      timestamp: new Date(Date.now() - 3 * 86400000),
      happy: 3,
      sad: 3,
      calm: 2,
      anxious: 4,
      energetic: 4,
    },
    {
      timestamp: new Date("2025-04-01T14:30:00"),
      happy: 3,
      sad: 1,
      calm: 4,
      anxious: 2,
      energetic: 3,
    },
    {
      timestamp: new Date("2025-05-15T10:00:00"),
      happy: 2,
      sad: 5,
      calm: 3,
      anxious: 3,
      energetic: 2,
    },
    {
      timestamp: new Date("2025-06-10T17:00:00"),
      happy: 4,
      sad: 2,
      calm: 2,
      anxious: 1,
      energetic: 4,
    },
    {
      timestamp: new Date("2025-03-12T09:00:00"),
      happy: 1,
      sad: 3,
      calm: 5,
      anxious: 2,
      energetic: 5,
    },
  ];

  useEffect(() => {
    const now = new Date();
    let filtered = [];

    switch (selectedFilter) {
      case "Last Scan":
        const last = mockData.reduce((a, b) =>
          a.timestamp > b.timestamp ? a : b
        );
        filtered = [last];
        break;
      case "This Week":
        filtered = mockData.filter(
          (scan) => now - scan.timestamp <= 7 * 86400000
        );
        break;
      case "This Month":
        filtered = mockData.filter(
          (scan) => now - scan.timestamp <= 30 * 86400000
        );
        break;
      case "This Year":
        filtered = mockData.filter(
          (scan) => scan.timestamp.getFullYear() === now.getFullYear()
        );
        break;
      default:
        filtered = mockData;
    }

    setScanCount(filtered.length);

    if (filtered.length > 0) {
      const sums = filtered.reduce(
        (acc, scan) => {
          acc[0] += scan.happy;
          acc[1] += scan.sad;
          acc[2] += scan.calm;
          acc[3] += scan.anxious;
          acc[4] += scan.energetic;
          return acc;
        },
        [0, 0, 0, 0, 0]
      );
      setFilteredData(sums.map((sum) => sum / filtered.length));
    } else {
      setFilteredData([0, 0, 0, 0, 0]);
    }
  }, [selectedFilter]);

  const pieData = d3Shape
    .pie()
    .value((d) => d)
    .padAngle(0.04)(filteredData);

  const arcGenerator = d3Shape
    .arc()
    .innerRadius(65)
    .outerRadius(100)
    .cornerRadius(10);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Analysis</Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              mode="text"
              contentStyle={styles.dropdownButtonContent}
              onPress={openMenu}
              labelStyle={styles.dropdownText}
              uppercase={false}
            >
              <View style={styles.dropdownRow}>
                <Text style={styles.dropdownText}>{selectedFilter}</Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={18}
                  color="#888"
                />
              </View>
            </Button>
          }
          contentStyle={styles.menuContent}
        >
          {filters.map((option) => (
            <Menu.Item
              key={option}
              onPress={() => {
                setSelectedFilter(option);
                closeMenu();
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

      <View style={styles.chartContainer}>
        <Svg width={220} height={220}>
          <G x={110} y={110}>
            {pieData.map((arc, index) => (
              <Path
                key={index}
                d={arcGenerator(arc)!}
                fill={colors[index % colors.length]}
              />
            ))}
          </G>
        </Svg>
        <View style={styles.centerText}>
          <Text style={styles.scanNumber}>{scanCount}</Text>
          <Text style={styles.scanLabel}>
            {scanCount === 1 ? "Scan" : "Scans"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginTop: 30,
    width: screenWidth - 32,
    alignSelf: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  dropdownRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 14,
    color: "#888",
  },
  dropdownButtonContent: {
    paddingHorizontal: 4,
  },
  menuContent: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 0,
    overflow: "hidden",
    minWidth: 140,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  dropdownItem: {
    backgroundColor: "#fff",
    borderRadius: 0,
    paddingVertical: 6,
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#888",
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 20,
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
  },
  scanNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  scanLabel: {
    fontSize: 14,
    color: "#666",
  },
});

export default MoodPieChartBox;
