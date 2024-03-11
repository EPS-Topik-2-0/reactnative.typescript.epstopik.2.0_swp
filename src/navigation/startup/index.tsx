import ScreenStartup from "../../containers/screenStartupContainer";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navRoutes } from "../navRoutes";
export default function RootStartup() {
  const CoreNavigator = createNativeStackNavigator();
  return (
    <CoreNavigator.Navigator
      initialRouteName={navRoutes.LOADING_STARTED}
      screenOptions={{
        headerShown: false,
      }}
    >
      <CoreNavigator.Screen
        name={navRoutes.LOADING_STARTED}
        component={ScreenStartup}
      />
    </CoreNavigator.Navigator>
  );
}
