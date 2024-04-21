import React, { Fragment } from "react";
import {
  StyleSheet,
  Alert,
  Switch,
  SafeAreaView,
  StatusBar,
  Text,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { ViewTheme } from "../components";
import Header from "./header";
import HeaderSchedule from "./headerSchedule";
import HeaderResult from "./headerResult";
import HeaderResultSeasonal from "./headerResultSeasonal";

import { typeTheme } from "../types";
import themes from "../themes";
import { iLayoutProps } from "./type";
import I18n from "../i18n";
import * as ProgressBar from "react-native-progress";

export default function Layout(props: iLayoutProps | any) {
  const [isTheme, setTheme] = useState<typeTheme>(props?.app?.theme);
  const [progress, setProgress] = useState(0);
  const animate = () => {
    let progress = 0;
    setProgress(progress);
    setTimeout(() => {
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1) {
          progress = 1;
        }
        setProgress(progress);
      }, 1000);
    }, 1500);
  };
  useEffect(() => {
    animate;
  });
  return (
    <Fragment>
    <SafeAreaView style={{ flex:0, backgroundColor: themes.Primary.mainColor }} />
    <SafeAreaView
      style={{ flex: 1, backgroundColor: themes.Primary.background }}
    >
      {props?.typeScreenSchedule ? (
        <HeaderSchedule
          loading={props?.loading}
          handleLeftBack={props.handleLeftBack}
          handleLeftBackLabel={props.handleLeftBackLabel}
          handleLeftMenus={props.handleLeftMenus}
          centerTitle={props.centerTitle}
        />
      ) 
      : props?.typeHeaderResult?(
        <HeaderResult
          loading={props?.loading}
          handleLeftBack={props.handleLeftBack}
          handleLeftBackLabel={props.handleLeftBackLabel}
          handleRightNotification={props.handleRightNotification}
          handleLeftMenus={props.handleLeftMenus}
          centerTitle={props.centerTitle}
          handleRightRegister={props.handleRightRegister}
          handleRightRegisterLabel={props.handleRightRegisterLabel}
          resultTitle={props.resultTitle}
          resultSubTitle={props.resultSubTitle}
        />
      ):
      props?.typeHeaderResultSeasonal?(
        <HeaderResultSeasonal
          loading={props?.loading}
          handleLeftBack={props.handleLeftBack}
          handleLeftBackLabel={props.handleLeftBackLabel}
          handleRightNotification={props.handleRightNotification}
          handleLeftMenus={props.handleLeftMenus}
          centerTitle={props.centerTitle}
          handleRightRegister={props.handleRightRegister}
          handleRightRegisterLabel={props.handleRightRegisterLabel}
          resultTitle={props.resultTitle}
          resultSubTitle={props.resultSubTitle}
        />):
      (
        <Header
          loading={props?.loading}
          handleLeftBack={props.handleLeftBack}
          handleLeftBackLabel={props.handleLeftBackLabel}
          handleRightNotification={props.handleRightNotification}
          handleLeftMenus={props.handleLeftMenus}
          centerTitle={props.centerTitle}
          handleRightRegister={props.handleRightRegister}
          handleRightRegisterLabel={props.handleRightRegisterLabel}
          resultTitle={props.resultTitle}
          resultSubTitle={props.resultSubTitle}
          backgroundMainColor={props.backgroundMainColor}
        />
      )}
      <ViewTheme theme={isTheme} style={[styles.container]}>
        {props?.loading || props?.loadingAppBar ? (
          <ProgressBar.Bar
            height={1}
            indeterminate
            width={500}
            style={{ zIndex: 2 }}
            borderColor={"white"}
            progress={progress}
          />
        ) : null}
        {props?.loading ? (
          <ViewTheme
            style={{
              zIndex: 1,
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              backgroundColor: themes.Primary.colorGrey100,
              opacity: 1,
              top: 1,
            }}
          >
            <ActivityIndicator size="large" color={themes.Primary.mainColor} />
            <Text style={{ marginTop: 5,color:themes.Primary.colorTextBlack }}>{
            props?.labelLoading!==''?props?.labelLoading:
            I18n.t("loading")}</Text>
          </ViewTheme>
        ) : null}
        {props.children}
      </ViewTheme>
    </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
