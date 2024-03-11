import { typeTheme, typeLanguages, iUsers } from "../../types";
import React, { ReactNode, useState, FunctionComponent, useRef } from "react";
import Theme from "../../themes";
import { StyleSheet, Modal, Image, View, Pressable } from "react-native";
// import {IMAGES} from '../../assets';
import ModalScroll from "react-native-modalbox";
import { TextTheme, ViewTheme, ButtonTheme, IconTheme } from "../index";

interface User {
  theme?: typeTheme;
  handleClick?: () => void;
  user: iUsers;
}
export default function User({ handleClick, theme, user }: User) {
  return (
    <>
      <ButtonTheme
        style={[
          styles.oneUser,
          theme == "light"
            ? { borderBottomColor: Theme.LayoutLight.border }
            : { borderBottomColor: Theme.LayoutDark.border },
        ]}
        theme={theme === "light" ? "dark" : "light"}
        onPress={handleClick}
      >
        <ViewTheme theme={theme} style={styles.flexRow}>
          <View style={styles.viewImage}>
            {/* <Image source={{uri: user.avatar_url}} style={styles.imageAvata} /> */}
          </View>
          <View style={styles.viewDetail}>
            <TextTheme theme={theme} style={styles.textName}>
              {user.login}
            </TextTheme>
          </View>
        </ViewTheme>
      </ButtonTheme>
    </>
  );
}

const styles = StyleSheet.create({
  oneUser: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
  },
  textName: { fontSize: 16 },
  flexRow: {
    flexDirection: "row",
  },
  viewImage: { flexDirection: "column", marginRight: 10 },
  imageAvata: { width: 35, height: 35, borderRadius: 10 },
  viewDetail: { flexDirection: "column", justifyContent: "center" },
});
