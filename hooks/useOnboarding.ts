import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "hasSeenOnboarding";

const useOnboarding = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const seen = await AsyncStorage.getItem(ONBOARDING_KEY);
      setHasSeenOnboarding(seen === "true");
    };
    checkOnboardingStatus();
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    setHasSeenOnboarding(true);
  };

  return { hasSeenOnboarding, completeOnboarding };
};

export default useOnboarding; // ✅ Make sure this is a default export
