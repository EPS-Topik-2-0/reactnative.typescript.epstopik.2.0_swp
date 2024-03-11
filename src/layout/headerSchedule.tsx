import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { ViewTheme, TextTheme } from "../components";
import ButtonTheme from "../components/ButtonTheme";
import {
  IcNotification,
  IcMenus,
  IcUserAdd,
  IcBackWhite,
} from "../assets";
import i18n from "../i18n";
import themes from "../themes";
import { iLayoutProps } from "./type";

export default function HeaderSchedule(props: iLayoutProps | any) {
  const isTheme = props?.app?.theme;
  return (
    <ViewTheme theme={isTheme} style={styles.layoutHeader}>
      {/* LEFT */}
      <View style={styles.layoutLeft}>
        {props?.handleLeftMenus ? (
          <TouchableOpacity
            disabled={props?.loading}
            onPress={() => props.handleLeftMenus()}
            style={{
              flexDirection: "row",
              alignContent: "flex-end",
              justifyContent: "flex-end",
              width: 40,
              marginLeft: 5,
            }}
          >
            <IcMenus width={35} height={35} />
          </TouchableOpacity>
        ) : null}
        {props?.handleLeftBack ? (
          <TouchableOpacity
            disabled={props?.loading}
            onPress={() => props?.handleLeftBack()}
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              alignItems: "center",
              paddingTop:20
            }}
          >
            <IcBackWhite width={25} height={25} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {props?.centerTitle ? (
          <Text
            numberOfLines={2}
            style={{
              color: themes.Primary.colorTextWhite,
              fontSize: 16,
              fontFamily: themes.FontFamily.Moul,
              textAlign: "center",
            }}
          >
            {props?.centerTitle}
          </Text>
        ) : null}
      </View>

      {/* RIGHT */}
      <View style={[styles.layoutRight, { width: 40 }]}>
        {props?.handleRightNotification ? (
          <ButtonTheme
            style={{
              flexDirection: "row",
              alignContent: "flex-end",
              justifyContent: "flex-end",
              width: 40,
              marginRight: 5,
            }}
            disabled={props?.loading}
          >
            <IcNotification width={35} height={35} />
          </ButtonTheme>
        ) : null}
        {props?.handleRightRegister ? (
          <View>
            <ButtonTheme
              disabled={props?.loading}
              onPress={props?.handleRightRegister}
              style={{
                flexDirection: "row",
                paddingVertical: 7,
                paddingHorizontal: 15,
                borderRadius: 8,
                backgroundColor: themes.Primary.buttonBackgroundMain,
                alignItems: "center",
              }}
            >
              <IcUserAdd width={25} height={25} />
              <TextTheme
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  fontFamily: themes.FontFamily.Hanuman,
                  color: themes.Primary.colorTextWhite,
                }}
              >
                {props?.handleRightRegisterLabel
                  ? props?.handleRightRegisterLabel
                  : i18n.t("register")}
              </TextTheme>
            </ButtonTheme>
            <View
              style={{
                marginTop: 5,
                paddingHorizontal: 15,
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  fontFamily: themes.FontFamily.Hanuman,
                  borderColor: themes.Primary.colorTextMain,
                  height: 1,
                }}
              ></Text>
            </View>
          </View>
        ) : null}
      </View>
    </ViewTheme>
  );
}

const styles = StyleSheet.create({
  layoutHeader: {
    height: 70,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: 10,
    // paddingTop: 10,
    backgroundColor: themes.Primary.mainColor,
  },
  layoutLeft: {
    flexDirection: "column",
    alignSelf: "center",
    width: 40,
    height: "100%",
  },
  layoutRight: {
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "flex-end",
    width: 120,
    height: "100%",
  },
});
