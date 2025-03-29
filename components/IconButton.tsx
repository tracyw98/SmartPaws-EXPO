import { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SFSymbol, SymbolView } from "expo-symbols";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

interface IconButtonProps {
  iosName: SFSymbol;
  androidName: ComponentProps<typeof Ionicons>["name"];
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: number;
  height?: number;
}

export default function IconButton({
  onPress,
  androidName,
  iosName,
  containerStyle,
  width = 40,
  height = 40,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: "#fff",
          borderRadius: 999,
          width,
          height,
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      <SymbolView
        name={iosName}
        size={width * 0.65}
        tintColor="#444"
        fallback={
          <Ionicons name={androidName} size={width * 0.65} color="#444" />
        }
      />
    </TouchableOpacity>
  );
}
