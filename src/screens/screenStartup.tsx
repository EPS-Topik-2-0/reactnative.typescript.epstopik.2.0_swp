import React from "react";
import {
  StyleSheet,
  Text,
  Keyboard,
  Platform,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import Layout from "../layout";
import { MLwithHRD } from "../assets";
import I18n from "../i18n";
import themes from "../themes";

export default function ScreenStartup(props: any) {
  const sideInfo = props?.sideInfo;
  React.useEffect(() => {
    setTimeout(() => {
      if (props.startup()) props.startup();
    }, 1000);
  }, []);
  React.useEffect(() => {
    console.log(sideInfo);
  }, [sideInfo]);
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.screen}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Layout>
            <View style={styles.container}>
              <Image source={MLwithHRD} style={styles.imageLogo} />
            </View>
            <ActivityIndicator size="large" color={themes.Primary.mainColor} />
          </Layout>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <Text style={styles.txtVersion}>{I18n.t("txtVersion")} 2.0.0</Text>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flex: Platform.OS === "ios" ? 0.75 : 0.75,
    justifyContent: "center",
    alignContent: "flex-end",
  },
  bodyScroll: {
    flex: 0.45,
    paddingHorizontal: 30,
    backgroundColor: themes.Primary.background,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },

  labelLogin: {
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 2,
  },
  txtLogin: {
    fontSize: 18,
    fontFamily: themes.FontFamily.HanumanBold,
  },
  input: {
    marginTop: 10,
  },
  viewBottomInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  touchCondition: {
    fontSize: 14,
    marginTop: -2,
    fontFamily: themes.FontFamily.Hanuman,
    paddingHorizontal: 3,
    color: themes.Primary.colorRed,
  },
  txtThereAre: {
    fontSize: 14,
    marginTop: -2,
    fontFamily: themes.FontFamily.Hanuman,
    color: themes.Primary.colorGrey,
  },
  buttonLogin: {
    width: "70%",
    height: 40,
    justifyContent: "center",
    backgroundColor: themes.Primary.mainColor,
    borderRadius: 12,
  },
  txtBtnLogin: {
    fontSize: 16,
    fontFamily: themes.FontFamily.Hanuman,
    textAlign: "center",
    color: themes.Primary.colorTextWhite,
  },
  txtLabel: {
    fontFamily: themes.FontFamily.Hanuman,
    fontSize: 12,
    textAlign: "center",
    color: themes.Primary.mainColor,
  },
  vBottom: {
    flexDirection: "column",
    marginTop: 30,
    alignItems: "center",
  },
  txtDesc: {
    color: themes.Primary.colorTextBlack,
    fontFamily: themes.FontFamily.Hanuman,
    textDecorationLine: "underline",
  },
  txtVersion: {
    fontSize: 10,
    color: themes.Primary.border,
    backgroundColor: themes.Primary.background,
    width: "100%",
    textAlign: "center",
  },
  imageLogo: {
    flex: 0.8,
    height: "100%",
    marginEnd: 10,
    marginStart: 10,
    resizeMode: "contain",
  },
  view_lr: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "center",
  },
  viewLine: {
    height: 2,
    backgroundColor: themes.Primary.mainColor,
    width: "100%",
  },
  view_lb: {
    flexDirection: "row",
  },
  text_lb: {
    fontSize: Platform.OS === "ios" ? 16 : 18,
    textAlign: "center",
  },
});
