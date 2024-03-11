import { typeTheme, typeIcon } from "../../types";
import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import Theme from "../../themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";

export default function IconTheme(props: {
  theme?: typeTheme;
  icon: typeIcon;
  name: string;
  size: number;
  lcolor?: string;
  dcolor?: string;
}) {
  const colorScheme = props.theme;
  const color =
    colorScheme === "light"
      ? props.lcolor !== undefined
        ? props.lcolor
        : Theme.LayoutLight.colorText
      : props.dcolor !== undefined
      ? props.dcolor
      : Theme.LayoutDark.colorText;
  const Icon = () => {
    if (props.icon === "AntDesign") {
      return <AntDesign name={props.name} size={props.size} color={color} />;
    } else if (props.icon === "Entypo") {
      return <Entypo name={props.name} size={props.size} color={color} />;
    } else if (props.icon === "EvilIcons") {
      return <EvilIcons name={props.name} size={props.size} color={color} />;
    } else if (props.icon === "Feather") {
      return <Feather name={props.name} size={props.size} color={color} />;
    } else if (props.icon === "FontAwesome") {
      return <FontAwesome name={props.name} size={props.size} color={color} />;
    } else if (props.icon === "FontAwesome5") {
      return <FontAwesome5 name={props.name} size={props.size} color={color} />;
    } else if (props.icon === "FontAwesome5Pro") {
      return (
        <FontAwesome5Pro name={props.name} size={props.size} color={color} />
      );
    } else if (props.icon === "Fontisto") {
      return <Fontisto name={props.name} size={props.size} color={color} />;
    } else if (props.icon === "Foundation") {
      return <Foundation name={props.name} size={props.size} color={color} />;
    } else if (props.icon === "Ionicons") {
      return <Ionicons name={props.name} size={props.size} color={color} />;
    } else if (props.icon === "MaterialCommunityIcons") {
      return (
        <MaterialCommunityIcons
          name={props.name}
          size={props.size}
          color={color}
        />
      );
    } else if (props.icon === "MaterialIcons") {
      return (
        <MaterialIcons name={props.name} size={props.size} color={color} />
      );
    } else if (props.icon === "Octicons") {
      return <Octicons name={props.name} size={props.size} color={color} />;
    } else if (props.icon === "SimpleLineIcons") {
      return (
        <SimpleLineIcons name={props.name} size={props.size} color={color} />
      );
    } else if (props.icon === "Zocial") {
      return <Zocial name={props.name} size={props.size} color={color} />;
    } else {
      return null;
    }
  };
  return Icon();
}
