import { StackActions, CommonActions } from "@react-navigation/native";
let navigator: any = {};

function setTopLevelNavigator(navigatorRef: any) {
  return (navigator = navigatorRef);
}

function navigate(routeName: string, params?: any) {
  try {
    return navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params: params,
      })
    );
  } catch (e: any) {}
}

function replace(routeName: string, params?: any) {
  try {
    return navigator.dispatch(StackActions.replace(routeName, params));
  } catch (e: any) {}
}

function reset(routeName: string, params?: any) {
  try {
    return navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: routeName,
            params,
          },
        ],
      })
    );
  } catch (e: any) {}
}

function goBack() {
  try {
    return navigator.dispatch(CommonActions.goBack());
  } catch (e: any) {}
}
const NavigationServer = {
  setTopLevelNavigator,
  navigate,
  replace,
  reset,
  goBack,
};

export default NavigationServer;
