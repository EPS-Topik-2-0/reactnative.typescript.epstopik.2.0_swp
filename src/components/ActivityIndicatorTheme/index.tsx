import { typeTheme } from "../../types";
import React from "react";
import { ActivityIndicator } from "react-native";
import Theme from "../../themes";

export default function ActivityIndicatorTheme(
  props: ActivityIndicator["props"] & {
    theme?: typeTheme;
  }
) {
  const colorScheme = props.theme;
  const color =
    colorScheme === "light"
      ? Theme.LayoutLight.colorText
      : Theme.LayoutDark.colorText;
  return (
    <ActivityIndicator {...props} color={props.color ? props.color : color} />
  );
}
