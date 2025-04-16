import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
import DogProfileCard from "../components/DogProfileCard"; // ✅ adjust if needed

// My Dogs Tab with Dog Cards
const MyDogsTab = React.memo(() => {
  const [dogs, setDogs] = useState([
    {
      id: "1",
      name: "Charlie",
      breed: "Shiba Inu",
      imageUri: "https://placedog.net/400/300?id=1",
    },
    {
      id: "2",
      name: "Luna",
      breed: "Labrador",
      imageUri: "https://placedog.net/400/300?id=2",
    },
  ]);

  // 🔜 Later: Replace with fetch from backend
  // useEffect(() => {
  //   fetch("https://your-api.com/my-dogs")
  //     .then((res) => res.json())
  //     .then((data) => setDogs(data));
  // }, []);

  return (
    <View style={styles.page}>
      <View style={styles.tabInner}>
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={18}
              color="#999"
              style={{ marginHorizontal: 8 }}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#999"
              style={styles.searchInput}
            />
          </View>
        </View>

        <FlatList
          data={dogs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DogProfileCard profile={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
});

// Snap History Tab (unchanged)
const SnapHistoryTab = React.memo(() => (
  <View style={styles.page}>
    <View style={styles.tabInner}>
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={18}
            color="#999"
            style={{ marginHorizontal: 8 }}
          />
          <TextInput
            placeholder="Search history"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>
        <Pressable style={styles.filterButton}>
          <Ionicons name="filter" size={18} color="#0451FA" />
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      </View>
      <View style={styles.outlineBox}>
        <Text style={styles.placeholderText}>Snap History content</Text>
      </View>
    </View>
  </View>
));

// Main screen with TabView
const DogScanScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "mydogs", title: "My Dogs" },
    { key: "snaphistory", title: "Snap History" },
  ]);

  const renderScene = useMemo(
    () =>
      SceneMap({
        mydogs: MyDogsTab,
        snaphistory: SnapHistoryTab,
      }),
    []
  );

  const renderTabBar = useCallback(
    (props: any) => (
      <View style={styles.tabRow}>
        {props.navigationState.routes.map((route: any, i: number) => {
          const isActive = index === i;
          return (
            <Pressable
              key={route.key}
              onPress={() => setIndex(i)}
              style={styles.tabButton}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {route.title}
              </Text>
              {isActive && <View style={styles.underline} />}
            </Pressable>
          );
        })}
      </View>
    ),
    [index]
  );

  return (
    <View style={styles.container}>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        swipeEnabled
      />
    </View>
  );
};

export default DogScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  tabButton: {
    marginHorizontal: 20,
    alignItems: "center",
  },
  tabText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#999",
  },
  activeTabText: {
    color: "#0451FA",
  },
  underline: {
    height: 3,
    width: "100%",
    backgroundColor: "#0451FA",
    borderRadius: 1.5,
    marginTop: 4,
  },
  page: {
    flex: 1,
  },
  tabInner: {
    flex: 1,
    paddingHorizontal: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 5,
  },
  searchInput: {
    height: 40,
    flex: 1,
    fontFamily: "Fredoka-Regular",
    fontSize: 14,
    color: "#333",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0451FA",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterText: {
    marginLeft: 5,
    color: "#0451FA",
    fontFamily: "Fredoka-Regular",
    fontSize: 13,
  },
  outlineBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontFamily: "Poppins-Bold",
    color: "#aaa",
  },
});
