import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navRoutes } from "./navRoutes";
import RootStartup from "./startup";
import RootMain from "./main";
import RootCore from "./core";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavigationService from "../services/navgationService";
import DrawerMenu from "../components/SideDrawer";
import { DataProvider } from "./dataContext";
const Drawer = createDrawerNavigator();
function Navigator() {
  const linking = {
    prefixes: ['epstopikapp://'],
    config: {
      screens: {
        [navRoutes.START_UP]: 'startup',
        [navRoutes.MAIN]: {
          path:'main',
          screens:{ [navRoutes.FORM]: 'form'}
        },
        [navRoutes.CORE]: 'core',
      },
    },
  };
  return (
    <NavigationContainer
      linking={linking}
      ref={(navigatorRef) =>
        NavigationService.setTopLevelNavigator(navigatorRef)
      }
    >
      <DataProvider>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerMenu {...props} />}
          screenOptions={{
            drawerStyle: {
              width: 260,
            },
            headerShown: false,
            gestureHandlerProps: {
              enabled: false,
            },
          }}
          initialRouteName={navRoutes.START_UP}
        >
          <Drawer.Screen
            options={{ headerShown: false }}
            name={navRoutes.START_UP}
            component={RootStartup}
          />
          <Drawer.Screen
            options={{ headerShown: false }}
            name={navRoutes.MAIN}
            component={RootMain}
          />
          <Drawer.Screen
            options={{ headerShown: false }}
            name={navRoutes.CORE}
            component={RootCore}
          />
        </Drawer.Navigator>
      </DataProvider>
    </NavigationContainer>
  );
}

export default Navigator;
