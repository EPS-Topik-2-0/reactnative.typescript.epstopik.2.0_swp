import { typeTheme } from "../../types";
import React, { ReactNode } from "react";
import { View } from "react-native";
import Theme from "../../themes";

export default function ViewTheme(
  props: View["props"] & {
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
    <View {...props} style={[{ backgroundColor: color }, props.style]}>
      {props.children}
    </View>
  );
}
