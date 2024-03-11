import React from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import { ViewTheme, TextTheme } from "../components";
import ButtonTheme from "../components/ButtonTheme";
import { IcBack,
  IcBackWhite,
  IcNotification,
  IcUserAddMainColor,
  IcMenus, IcUserAdd } from "../assets";
import i18n from "../i18n";
import themes, { FontFamily } from "../themes";
import { iLayoutProps } from "./type";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Header(props: iLayoutProps | any) {
  const isTheme = props?.app?.theme;
  return (
    <ViewTheme theme={isTheme} style={[styles.layoutHeader,{
      backgroundColor:props?.backgroundMainColor?themes.Primary.mainColor:''
    }]}>
      {/* LEFT */}
      <View style={styles.layoutLeft}>
        {props?.handleLeftMenus ? (
          <ButtonTheme
            disabled={props?.loading}
            onPress={() => props?.handleLeftMenus()}
            style={{
              flexDirection: "row",
              alignContent: "flex-end",
              justifyContent: "flex-end",
              width: 40,
            }}
          >
            <IcMenus width={35} height={35} />
          </ButtonTheme>
        ) : null}
        {props?.handleLeftBack ? (
          <TouchableOpacity
            disabled={props?.loading}
            onPress={() => props?.handleLeftBack()}
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            {
              props?.backgroundMainColor?
            <IcBackWhite width={25} height={25} />
            :
            <IcBack width={25} height={25} />
            }
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
                color: props?.backgroundMainColor?themes.Primary.colorTextWhite:themes.Primary.mainColor,
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
                color: themes.Primary.success,
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
                color: themes.Primary.success,
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
          <ButtonTheme
            disabled={props?.loading}
            onPress={props?.handleRightNotification}
            style={{
              flexDirection: "row",
              alignContent: "flex-end",
              justifyContent: "flex-end",
              width: 40,
            }}
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
                backgroundColor: themes.Primary.colorTextWhite,
                alignItems: "center",
                width: 130,
              }}
            >
              <IcUserAddMainColor width={25} height={25} />
              <TextTheme
                style={{
                  fontSize: 16,
                  marginLeft: 2,
                  fontFamily: themes.FontFamily.Hanuman,
                  color: themes.Primary.colorTextMain,
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
    height: 56,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  layoutLeft: {
    flexDirection: "column",
    alignSelf: "center",
    width: 120,
    height: "100%",
  },
  layoutRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    width: 120,
    height: "100%",
  },
});
