import React from "react";
import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  RefreshControl,
} from "react-native";

import Layout from "../layout";
import { Notification } from "../components";

import I18n from "../i18n";
import { useForm } from "react-hook-form";
import themes from "../themes";
import NavigationService from "../services/navgationService";

export default function ScreenHome(props: any) {
  const {
    formState: { errors },
  } = useForm();
  const [refreshing, setRefreshing] = React.useState(false);
  const notifications = props?.notifications;
  const [isIdViewing, setIdViewing] = React.useState(-1);

  const notificationLoading = props?.notificationLoading;
  const handleRequest = async () => {
    if (props?.useNotification) await props?.useNotification();
  };

  React.useEffect(() => {
    handleRequest();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    handleRequest();
    setTimeout(() => {
      setRefreshing(false);
      setIdViewing(-1);
    }, 2000);
  };

  return (
    <Layout
      loading={notificationLoading || refreshing || false}
      centerTitle={I18n.t("notification")}
      handleLeftBack={() => NavigationService.goBack()}
      handleLeftBackLabel={I18n.t("homepage")}
      backgroundMainColor
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.bodyScroll}
      >
        {notifications?.message === "success" &&
        Array.isArray(notifications?.data)
          ? notifications?.data?.map((one: any, i: number) => (
              <Notification
                viewing={isIdViewing === i}
                onPress={() => setIdViewing(i)}
                data={one}
                key={i}
              />
            ))
          : null}
        <View
          style={{
            height: 50,
          }}
        ></View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "flex-end",
  },
  bodyScroll: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: themes.Primary.background,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingTop: 30,
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
    height: "100%",
    alignContent: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
