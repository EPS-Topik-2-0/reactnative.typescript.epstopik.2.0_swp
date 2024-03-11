import { typeTheme } from "../../types";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native";
import Theme from "../../themes";

export default function SafeAreaViewTheme(
  props: SafeAreaView["props"] & {
    theme?: typeTheme;
    children?: ReactNode;
  }
) {
  const colorScheme = props.theme;
  const color =
    colorScheme === "light"
      ? Theme.LayoutLight.background
      : Theme.LayoutDark.background;
  return (
    <SafeAreaView
      {...props}
      style={[{ backgroundColor: color, flex: 1 }, props.style]}
    >
      {props.children}
    </SafeAreaView>
  );
}
