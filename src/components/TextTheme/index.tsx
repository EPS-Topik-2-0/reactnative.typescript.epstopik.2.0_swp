import { typeTheme } from "../../types";
import React, { ReactNode } from "react";
import { Text } from "react-native";
import Theme from "../../themes";

export default function TextTheme(
  props: Text["props"] & {
    theme?: typeTheme;
    children?: ReactNode;
  }
) {
  const colorScheme = props.theme;
  const color =
    colorScheme === "light"
      ? Theme.LayoutLight.colorText
      : Theme.LayoutDark.colorText;
  return (
    <Text {...props} style={[{ color: color }, props?.style]}>
      {props.children}
    </Text>
  );
}
