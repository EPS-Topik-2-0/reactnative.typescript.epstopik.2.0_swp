import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  TouchableNativeFeedback,
  View,
} from "react-native";

import { IcMessage } from "../../assets";
import themes from "../../themes";

export default function Notification(data: any) {
  const dataNotification = data?.data;
  const viewing = data?.viewing;

  return (
    <TouchableNativeFeedback
      onPress={() => data?.onPress()}
      style={{ marginBottom: 15 }}
    >
      <View style={[styles.container]}>
        <View style={styles.layoutIcon}>
          <IcMessage width={20} height={20} />
          <Text numberOfLines={1} style={styles.txtTitle}>
            {dataNotification?.title}
          </Text>
        </View>
        <View style={styles.viewContent}>
          <View
            style={{
              flex: 0.85,
              marginTop: 10,
              flexDirection: "row",
            }}
          >
            <Text numberOfLines={viewing ? 10 : 2} style={styles.txtBody}>
              {dataNotification?.message}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.2,
            flexDirection: "row-reverse",
          }}
        >
          <Text style={styles.txtDate}>១៧-ធ្នូ-២០២៣</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    shadowColor: themes.Primary.colorGrey,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 5,
    backgroundColor: themes.Primary.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: Platform.OS === "android" ? 1 : 1,
    borderColor: themes.Primary.colorGrey100,
    marginHorizontal: 2,
  },
  layoutIcon: {
    flex: 0.2,
    flexDirection: "row",
  },
  txtTitle: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: themes.FontFamily.HanumanBold,
    color: themes.Primary.colorTextBlack,
  },
  viewContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    overflow: "hidden",
  },
  txtBody: {
    fontSize: 12,
    fontFamily: themes.FontFamily.Hanuman,
    color: themes.Primary.colorTextBlack,
    textAlign: "left",
    width: "100%",
  },
  txtDate: {
    fontSize: 12,
    fontFamily: themes.FontFamily.Hanuman,
    color: themes.Primary.colorGrey,
  },
});
