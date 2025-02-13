import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { CustomStatusbarProps } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppSelector } from "../hooks/redux_hooks";

const CustomStatusbar: React.FC<CustomStatusbarProps> = ({
  backgroundColor,
  barStyle,
}) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const { mode } = useAppSelector((state) => state.common);

  return (
    <>
      {Platform.OS == "android" ? (
        <StatusBar
          backgroundColor={backgroundColor}
          barStyle={
            barStyle
              ? barStyle
              : mode == "dark"
              ? "light-content"
              : "dark-content"
          }
        />
      ) : (
        <View
          style={{
            height: statusBarHeight,
            backgroundColor: backgroundColor,
          }}
        />
      )}
    </>
  );
};

export default CustomStatusbar;
