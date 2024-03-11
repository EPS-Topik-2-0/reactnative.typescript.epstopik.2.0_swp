import { typeTheme } from "../../types";
import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import Theme from "../../themes";

export default function ButtonTheme(
  props: TouchableOpacity["props"] & {
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
    <TouchableOpacity
      {...props}
      style={[{ backgroundColor: color }, props?.style]}
    >
      {props.children}
    </TouchableOpacity>
  );
}
