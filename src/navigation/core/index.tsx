import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navRoutes } from "../navRoutes";
import ScreenNotification from "../../containers/screenNotificationContainer";
import ScreenLogin from "../../containers/screenLoginContainer";
import ScreenSignup from "../../containers/screenSignupContainer";
import ScreenGuide from "../../containers/screenGuideContainer";
import ScreenTermOfUsed from "../../containers/screenTermOfUsedContainer";
import ScreenCard from "../../containers/screenCardSceduleContainer";

export default function RootCore() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={navRoutes.CARD}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={navRoutes.NOTIFICATION}
        component={ScreenNotification}
      />
      <Stack.Screen name={navRoutes.LOGIN} component={ScreenLogin} />
      <Stack.Screen name={navRoutes.GUIDE} component={ScreenGuide} />
      <Stack.Screen name={navRoutes.TERMOfUSE} component={ScreenTermOfUsed} />
      <Stack.Screen name={navRoutes.SIGNUP} component={ScreenSignup} />
      <Stack.Screen name={navRoutes.CARD} component={ScreenCard} />
    </Stack.Navigator>
  );
}
