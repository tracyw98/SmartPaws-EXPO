import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

// Keep splash visible until app is ready
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
          "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
          "Figtree-Regular": require("./assets/fonts/Figtree-Regular.ttf"),
          "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
        });

        await Asset.loadAsync([
          require("./assets/dog-bell.png"),
          require("./assets/dog-stats.png"),
          require("./assets/LetsGetStartedDog.png"),
          require("./assets/simplecamera.png"),
          require("./assets/dog-and-statistics.png"),
          require("./assets/number-one-circle.png"),
          require("./assets/number-two-circle.png"),
          require("./assets/number-three-circle.png"),
        ]);
      } catch (e) {
        console.warn("Error loading assets:", e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!isReady) return null;

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
