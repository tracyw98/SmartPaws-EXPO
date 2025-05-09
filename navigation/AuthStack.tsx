import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Login1 from "../screens/Login1";
import SignUp1 from "../screens/SignUp1";
import SignUpMain from "../screens/SignUpMain";
import ResetPassword from "../screens/ResetPassword";
import PasswordChanged from "../screens/PasswordChanged";
import HomeScreen from "../screens/HomeScreen";
import ForgetPassword from "../screens/ForgetPassword";
import ForgetPasswordCode from "../screens/ForgetPasswordCode";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignUpMain"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // ❌ Disable swipe back globally
      }}
    >
      <Stack.Screen name="Login1" component={Login1} />
      <Stack.Screen name="SignUp1" component={SignUp1} />
      <Stack.Screen name="SignUpMain" component={SignUpMain} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="PasswordChanged" component={PasswordChanged} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      {/* ✅ Allow swipe back on just this screen */}
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ gestureEnabled: true }}
      />

      <Stack.Screen name="ForgetPasswordCode" component={ForgetPasswordCode} />
    </Stack.Navigator>
  );
}
