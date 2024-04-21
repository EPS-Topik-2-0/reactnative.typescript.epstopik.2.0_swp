import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { ViewTheme } from "../components";
import { IcNotificationWhiteSmall, IcMenusSmall,  } from "../assets";
import themes from "../themes";
import { iLayoutProps } from "./type";

export default function Header(props: iLayoutProps | any) {
  const isTheme = props?.app?.theme;
  return (
    <ViewTheme theme={isTheme} style={styles.layoutHeader}>
      {/* LEFT */}
      <View style={styles.layoutLeft}>
        {props?.handleLeftMenus ? (
          <TouchableOpacity
            disabled={props?.loading}
            onPress={() => props?.handleLeftMenus()}
            style={{
              flexDirection: "row",
              alignContent: "flex-end",
              justifyContent: "flex-end",
              width: 40,
            }}
          >
            <IcMenusSmall width={35} height={35} />
          </TouchableOpacity>
        ) : null}
      </View>
      {/* {CENTER} */}
      {props.centerTitle ? (
        <View
          style={{
            flex: 1,
            alignItems:
              props?.handleRightNotification && props?.handleRightRegister
                ? "center"
                : "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {props?.centerTitle ? (
            <Text
              style={{
                color: themes.Primary.colorTextWhite,
                fontSize: 16,
                fontFamily: themes.FontFamily.Moul,
                marginLeft:
                  !props?.handleRightNotification && !props?.handleRightRegister
                    ? -120
                    : 0,
                textAlign:
                  props?.handleRightNotification && props?.handleRightRegister
                    ? "center"
                    : "left",
              }}
            >
              {props?.centerTitle}
            </Text>
          ) : null}
        </View>
      ) : null}
      {props?.resultTitle || props?.resultSubTitle ? (
        <View
          style={{
            marginHorizontal: -120,
            zIndex: -1,
          }}
        >
          {props?.resultTitle ? (
            <Text
              style={{
                color: themes.Primary.colorTextWhite,
                fontSize: 14,
                fontFamily: themes.FontFamily.Moul,
                textAlign: "center",
              }}
            >
              {props?.resultTitle}
            </Text>
          ) : null}
          {props?.resultSubTitle ? (
            <Text
              style={{
                color: themes.Primary.colorTextWhite,
                fontSize: 14,
                lineHeight: 23,
                fontFamily: themes.FontFamily.Moul,
                textAlign: "center",
              }}
            >
              {props?.resultSubTitle}
            </Text>
          ) : null}
        </View>
      ) : null}

      {/* RIGHT */}
      <View
        style={[
          styles.layoutRight,
          { width: props?.handleRightNotification ? 120 : 0 },
        ]}
      >
        {props?.handleRightNotification ? (
          <TouchableOpacity
            disabled={props?.loading}
            onPress={props?.handleRightNotification}
            style={{
              flexDirection: "row",
              alignContent: "flex-end",
              justifyContent: "flex-end",
              width: 40,
            }}
          >
            <IcNotificationWhiteSmall width={35} height={35} />
          </TouchableOpacity>
        ) : null}
      </View>
    </ViewTheme>
  );
}

const styles = StyleSheet.create({
  layoutHeader: {
    height: 56,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor:themes.Primary.mainColor
  },
  layoutLeft: {
    flexDirection: "column",
    alignSelf: "center",
    width: 120,
    height: "100%",
    justifyContent:'center',
  },
  layoutRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    width: 120,
    height: "100%",
    justifyContent:'center',
  },

});
