import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import DogResultSummary from "./DogResultSummary";
import DogDetailsForm from "./DogDetailsForm";

const Stack = createStackNavigator();

const NewDogNavigator: React.FC = () => {
  const [dogInfo, setDogInfo] = useState({
    breed: "Golden Retriever",
    size: "Large",
    age: "2 years",
    color: "Golden",
    name: "",
    gender: "",
  });

  return (
    <NavigationContainer independent={true}>
      {" "}
      {/* ✅ This is key */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DogResultSummary">
          {({ navigation }) => (
            <DogResultSummary
              dogInfo={dogInfo}
              onNext={() => navigation.navigate("DogDetailsForm")}
              onEdit={() => navigation.navigate("DogDetailsForm")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="DogDetailsForm">
          {({ navigation }) => (
            <DogDetailsForm
              dogInfo={dogInfo}
              setDogInfo={setDogInfo}
              onBack={() => navigation.goBack()}
              onComplete={() => {
                console.log("Finished profile setup", dogInfo);
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NewDogNavigator;
