import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  View,
  Alert
} from "react-native";

import I18n from "../../i18n";
import themes from "../../themes";
import NavigationService from "../../services/navgationService";
import { navRoutes } from "../../navigation/navRoutes";
import moment from "moment";

export default function Schedule(data: any) {
  const dataSchedule = data?.data;
  const logged=data?.logged;
  return (
    <TouchableOpacity
      onPress={() => {
        if(logged){
          if (dataSchedule?.id > 0) {
            NavigationService.navigate(navRoutes.FORM, dataSchedule);
          }
        }else{
          Alert.alert(
            `${I18n.t('titlePleaseRequiredLogin')}`,
            `${I18n.t('messagePleaseRequiredLogin')}`,
            [
              {
                text: `${I18n.t('login')}`,
                onPress: () => NavigationService.reset(navRoutes.LOGIN),
              },
            ],
            { cancelable: false }
          );
        }
      }}
      style={{ marginBottom: 15 }}
    >
      <View style={[styles.container]}>
        <View style={[styles.layoutShadow]}>
          <View style={styles.layoutLabelSpecial}>
            {dataSchedule?.special ? (
              <View style={styles.containerLabelSpecial}>
                <Text style={styles.txtSpecial}>{`${I18n.t("special")}`}</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.layoutTitleExam}>
            <Text style={styles.txtTitleExam}>{dataSchedule?.name}</Text>
          </View>
          <View style={styles.layoutDate}>
            <Text style={styles.txtDate}>
              {moment(`${dataSchedule?.dateStart}`).format("MM-DD-yyyy")}
            </Text>
            <TouchableOpacity style={{ height: "100%" }}>
              <Text
                style={{
                  color: themes.Primary.colorTextBlack,
                }}
              >
                ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    borderBottomColor: themes.Primary.mainColor,
    borderBottomWidth: 3,
  },
  layoutShadow: {
    height: 180,
    borderRadius: 10,
    shadowColor: themes.Primary.colorGrey,

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 9,

    backgroundColor: themes.Primary.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: Platform.OS === "android" ? 1 : 1,
    borderColor: themes.Primary.buttonBackgroundMain,
  },
  layoutLabelSpecial: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerLabelSpecial: {
    backgroundColor: themes.Primary.mainColor,
    paddingHorizontal: 10,
    paddingTop: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: -20,
    borderRadius: 5,
    shadowColor: themes.Primary.colorGrey,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  txtSpecial: {
    fontSize: 14,
    fontFamily: themes.FontFamily.HanumanBold,
    color: themes.Primary.colorTextWhite,
  },
  layoutTitleExam: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.7,
  },
  txtTitleExam: {
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: "center",
    fontFamily: themes.FontFamily.Moul,
    color: themes.Primary.colorTextBlack,
  },
  txtDate: {
    fontSize: 12,
    fontFamily: themes.FontFamily.Hanuman,
    color: themes.Primary.colorTextBlack,
  },
  layoutDate: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "space-between",
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
    paddingLeft: 10,
  },
  imageLogo: {
    flex: 0.8,
    height: "100%",
    marginEnd: 5,
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

  content: {
    flex: 1,
    marginTop: -180,
    alignContent: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
