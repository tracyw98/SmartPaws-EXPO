import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../screens/LoadingScreen";
import OnboardingStack from "./OnboardingStack";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<
    "OnboardingStack" | "AuthStack"
  >("OnboardingStack");

  useEffect(() => {
    const checkAppState = async () => {
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      setInitialRoute(hasOnboarded ? "AuthStack" : "OnboardingStack");
      setIsLoading(false);
    };

    checkAppState();
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="OnboardingStack"
        component={OnboardingStack}
        options={{ gestureEnabled: false }} // 🚫 Disable swipe back
      />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
}
