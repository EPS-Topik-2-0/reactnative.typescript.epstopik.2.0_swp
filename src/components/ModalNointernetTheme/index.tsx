import { typeTheme, typeLanguages } from "../../types";
import React, { ReactNode, useState, FunctionComponent, useRef } from "react";
import Theme from "../../themes";
import { StyleSheet, Modal, Image, View, Pressable } from "react-native";
import ModalScroll from "react-native-modalbox";
import { TextTheme, ViewTheme, ButtonTheme, IconTheme } from "../index";
import themes from "../../themes";
import { NoInternet } from "../../assets";

interface ModalNoInternetType {
  theme?: typeTheme;
  visible?: boolean;
  handleClose?: () => void;
  handleReload?: () => void;
}
export default function ModalNoInternetTheme({
  visible,
  theme,
  handleClose,
  handleReload,
}: ModalNoInternetType) {
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
              <NoInternet width={200} height={200} />
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
}

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
