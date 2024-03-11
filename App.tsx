import React, { useState } from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "./src/navigation";
import store from "./src/providers";
import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { typeTheme } from "./src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import { API_HOST } from '@env';

import {
  StyleSheet,
  StatusBar,
  Modal,
  View,
  Pressable,
  Platform,
  Linking,
} from "react-native";
import ModalScroll from "react-native-modalbox";
import {
  TextTheme,
  ViewTheme,
  ButtonTheme,
  ModalForceUpdate,
  ModalDisableApp,
} from "./src/components";
import themes from "./src/themes";
import { NoInternet } from "./src/assets";
import { axios } from "./src/api";
import { getVersion } from "react-native-device-info";
import { keystores } from "./src/constants";
import NavigationServer from "./src/services/navgationService";
import { navRoutes } from "./src/navigation/navRoutes";

interface ModalNoInternetType {
  theme?: typeTheme;
  visible?: boolean;
  handleClose?: () => void;
  handleReload?: () => void;
}

export const ModalNoInternetTheme = ({
  visible,
  theme,
  handleClose,
  handleReload,
}: ModalNoInternetType) => {
  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.coverCenter}>
        <Pressable
          onPress={handleClose}
          style={styles.btnOpacityHide}
        ></Pressable>
        <View style={styles.contentView}>
          <ModalScroll
            swipeToClose={false}
            animationDuration={1000}
            backdropOpacity={0}
            style={[
              styles.modalScroll,
              theme === "dark"
                ? styles.modalScrollDark
                : styles.modalScrollLight,
            ]}
            isOpen={visible}
            onClosed={handleClose}
          >
            <ViewTheme theme={theme} style={styles.viewBody}>
              <NoInternet width={180} height={180} />
              <TextTheme theme={theme} style={[styles.fontBigLetter]}>
                No Internet !
              </TextTheme>
              <TextTheme theme={theme} style={[styles.smallMessage]}>
                No internet connection found. check your connection or try again
              </TextTheme>
            </ViewTheme>
            <ButtonTheme
              theme={theme}
              onPress={handleReload}
              style={[styles.buttonTryAgain]}
            >
              <TextTheme
                theme={theme == "dark" ? "light" : "dark"}
                style={[styles.textButton]}
              >
                Try Again!
              </TextTheme>
            </ButtonTheme>
          </ModalScroll>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  coverCenter: {
    flex: 1,
    backgroundColor: "rgba(157, 166, 170, 0.88)",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  btnOpacityHide: {
    flex: 1,
    width: "100%",
  },
  contentView: {
    width: "100%",
    height: 460,
  },
  viewBody: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop:50
  },
  viewCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalScroll: {
    flexDirection: "column",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalScrollLight: {
    backgroundColor: themes.LayoutLight.background,
  },
  modalScrollDark: {
    backgroundColor: themes.LayoutDark.background,
  },
  fontBigLetter: {
    fontSize: 18,
    marginTop: 10,
  },
  smallMessage: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  buttonTryAgain: {
    width: 160,
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    textAlign: "center",
    fontSize: 14,
  },
});

const App = () => {
  const [isInternet, setInternet] = useState<boolean>(false);
  const [isForceUpdate, setForceUpdate] = useState<{
    visible: boolean;
    link: string;
  }>({
    visible: false,
    link: "",
  });
  const [isDisable, setDisable] = useState<{
    visible: boolean;
    message: string;
  }>({
    visible: false,
    message: "",
  });
  const [isCurrentTheme, setCurrentTheme] = useState<typeTheme>(
    store.getState().app.theme
  );

  async function checkNetwork() {
    await NetInfo.addEventListener((networkState) => {
      var network =
        networkState.type === "wifi" ||
        networkState.type === "cellular" ||
        networkState.isConnected
          ? true
          : false;
      setInternet(network);
    });
  }

  useEffect(() => {
    (async () => {
      checkNetwork();
      setCurrentTheme(store.getState().app.theme);
      getAppVersion();
    })();
  }, []);

  function handleClose() {
    return checkNetwork();
  }

  function handleReload() {
    setInternet(false);
    NavigationServer.reset(navRoutes.START_UP)
    return setTimeout(()=>{
      checkNetwork()
    },2000);
  }

  //refresh token
  useEffect(() => {
    setInterval(async () => {
      if (isInternet) {
        console.log('API_HOST',API_HOST)
        // console.log("refreshToken");
      }
    }, 1000 * 50);
  }, [isInternet]);

  const getAppVersion = async () => {
    const url = `side-info/${
      Platform.OS === "ios"
        ? "ios"
        : Platform.OS === "android"
        ? "android"
        : "website"
    }/${new Date().getTime()}`;
    try {
      await axios
        .get(url,{timeout: 5000,})
        .then(async (result) => {
          const info = result?.data?.data;
          if (
            result?.data?.message === "success" &&
            info &&
            Array.isArray(info) &&
            info?.length>0
          ) {
            await AsyncStorage.setItem(
              keystores.sideInfo,
              JSON.stringify(info?.[0])
            );
            if (Number(info?.[0]?.deviceStatus) === 0) {
              setDisable({
                visible: true,
                message: info?.[0]?.message,
              });
            } else {
              const currentApp = parseFloat(getVersion());
              if (Platform.OS === "android") {
                if (Number(info?.[0]?.version) > currentApp) {
                  setForceUpdate({
                    visible: true,
                    link: info?.[0]?.link,
                  });
                }
              } else if (Platform.OS === "ios") {
                if (Number(info?.[0]?.version) > currentApp) {
                  setForceUpdate({
                    visible: true,
                    link: info?.[0]?.link,
                  });
                }
              } else {
                setDisable({
                  visible: false,
                  message: info?.[0]?.message,
                });
              }
            }
          }
        })
        .catch((error) => {
          setDisable({
            visible: false,
            message: "",
          });
        });
    } catch (e) {
      setDisable({
        visible: true,
        message: "",
      });
    }
  };
  return (
    <>
      <StatusBar
        animated={true}
        hidden={false}
        backgroundColor={themes.Primary.mainColor}
        barStyle="light-content"
      />
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigator />
        </Provider>
        <ModalNoInternetTheme
          theme={isCurrentTheme}
          handleClose={() => handleClose()}
          visible={!isInternet} // false no internet
          handleReload={() => handleReload()}
        />
        <ModalForceUpdate
          theme={isCurrentTheme}
          handleClose={() => null}
          visible={isForceUpdate.visible}
          handleReload={() => Linking.openURL(isForceUpdate.link)}
        />
        <ModalDisableApp
          theme={isCurrentTheme}
          visible={isDisable.visible}
          message={isDisable.message}
        />
        <FlashMessage position="top" titleStyle={{ paddingTop: 5 }} />
      </SafeAreaProvider>
    </>
  );
};

export default App;
