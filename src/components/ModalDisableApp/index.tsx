import { PropsType } from "./type";
import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import ModalScroll from "react-native-modalbox";
import themes from "../../themes";
import { ImDisable } from "../../assets";
import I18n from "../../i18n";

const ModalDisableApp = ({ visible, theme, message }: PropsType) => {
  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.coverCenter}>
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
          >
            <View style={styles.viewBody}>
              <ImDisable width={200} height={200} />
              <Text style={[styles.fontBigLetter]}>
                {`${I18n.t("titleDisable")}`}
              </Text>
              <Text style={[styles.smallMessage]}>
                {message && message?.length > 0
                  ? message
                  : `${I18n.t("messageDisable")}`}
              </Text>
            </View>
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
  },
  viewCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalScroll: {
    paddingTop: 20,
    flexDirection: "column",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalScrollLight: {
    backgroundColor: themes.LayoutLight.background,
  },
  modalScrollDark: {
    backgroundColor: themes.LayoutDark.background,
  },
  fontBigLetter: {
    fontSize: 20,
    fontFamily: themes.FontFamily.Moul,
    color: themes.Primary.colorRed100,
    marginTop: 10,
  },
  smallMessage: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 40,
    color:themes.Primary.colorTextBlack
  },
  buttonTryAgain: {
    width: 180,
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: themes.Primary.buttonBackgroundMain,
  },
  textButton: {
    textAlign: "center",
    fontSize: 14,
    color: themes.Primary.colorTextWhite,
  },
});

export default ModalDisableApp;
