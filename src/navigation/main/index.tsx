import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navRoutes } from "../navRoutes";
import ScreenHome from "../../containers/screenHomeContainer";
import ScreenNotification from "../../containers/screenNotificationContainer";
import ScreenLogin from "../../containers/screenLoginContainer";
import ScreenSignup from "../../containers/screenSignupContainer";
import ScreenGuide from "../../containers/screenGuideContainer";
import ScreenTermOfUsed from "../../containers/screenTermOfUsedContainer";
import ScreenCard from "../../containers/screenCardScheduleContainer";
import ScreenCardSeasonal from "../../containers/screenCardScheduleSeasonalContainer";
import ScreenForm from "../../containers/screenFormScheduleContainer";
import ScreenFormSeasonal from "../../containers/screenFormScheduleSeasonalContainer";
import ScreenInfo from "../../containers/screenInfoContainer";
import ScreenFacebook from "../../containers/screenFacebookContainer";
import ScreenAboutUs from "../../containers/screenAboutUsContainer";
import ScreenViaBakong from "../../containers/screenViaBakongContainer";
import ScreenViaWing from "../../containers/screenViaWingContainer";
import ScreenYoutube from "../../containers/screenYoutubeContainer";

export default function RootMain() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={navRoutes.HOME}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={navRoutes.HOME} component={ScreenHome} />
      <Stack.Screen
        name={navRoutes.NOTIFICATION}
        component={ScreenNotification}
      />
      <Stack.Screen name={navRoutes.LOGIN} component={ScreenLogin} />
      <Stack.Screen name={navRoutes.GUIDE} component={ScreenGuide} />
      <Stack.Screen name={navRoutes.SIGNUP} component={ScreenSignup} />
      <Stack.Screen name={navRoutes.CARD} component={ScreenCard} />
      <Stack.Screen name={navRoutes.CARD_SEASONAL} component={ScreenCardSeasonal} />
      <Stack.Screen name={navRoutes.FORM} component={ScreenForm} />
      <Stack.Screen name={navRoutes.FORM_SEASONAL} component={ScreenFormSeasonal} />
      <Stack.Screen name={navRoutes.INFO} component={ScreenInfo} />
      <Stack.Screen name={navRoutes.TERMOfUSE} component={ScreenTermOfUsed} />
      <Stack.Screen name={navRoutes.FACEBOOK} component={ScreenFacebook} />
      <Stack.Screen name={navRoutes.ABOUT} component={ScreenAboutUs} />
      <Stack.Screen name={navRoutes.BAKONG} component={ScreenViaBakong} />
      <Stack.Screen name={navRoutes.WING} component={ScreenViaWing} />
      <Stack.Screen name={navRoutes.YOUTUBE} component={ScreenYoutube} />
    </Stack.Navigator>
  );
}
