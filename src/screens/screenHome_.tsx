import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  Linking,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
} from "react-native";
import { Schedule,ActivityIndicatorTheme } from "../components";
import Layout from "../layout";
import {
  MLwithHRD,
} from "../assets";
import I18n from "../i18n";
import themes from "../themes";
import NavigationService from "../services/navgationService";
import { navRoutes } from "../navigation/navRoutes";
import { ResponseSchedule } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keystores } from "../constants";

function NoSchedule() {
  return (
    <>
      <View style={[styles.container, { flex: 0.4 }]}>
        <Image source={MLwithHRD} style={styles.imageLogo} />
      </View>
      <View style={styles.content}>
        <Text
          style={{
            width: "80%",
            textAlign: "center",
            fontSize: 18,
            fontFamily: themes.FontFamily.MuolLight,
            color: themes.Primary.colorRed100,
          }}
        >
          {I18n.t("wordSorry")}
        </Text>
        <Text
          style={{
            width: "80%",
            textAlign: "center",
            color: themes.Primary.colorRed100,
          }}
        >
          {I18n.t("wanningNoSchedule1")}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: themes.Primary.colorRed100,
          justifyContent: "center",
          paddingVertical: 15,
        }}
      >
        <Text
          style={{ textAlign: "center", color: themes.Primary.colorTextWhite }}
        >
          {I18n.t("wanningNoSchedule2")}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("http://mtosb.gov.kh/");
            }}
          >
            <Text
              style={{
                color: themes.Primary.wanning,
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              គេហទំព័រ,
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginStart: 5 }}
            onPress={() => {
              Linking.openURL("https://www.facebook.com/mtosbcambodia");
            }}
          >
            <Text
              style={{
                color: themes.Primary.wanning,
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              ទំព័រហ្វ៊េសបុកផ្លូវការ
            </Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", color: "white", marginStart: 5 }}>
            និង App​​​ របស់ គ.ប.ប.ព.ប
          </Text>
        </View>
      </View>
    </>
  );
}
export default function ScreenHome(props: any) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isStartupLoading, setStartupLoading] = React.useState(true);
  const homeLoading = props?.homeLoading;
  const schedules: ResponseSchedule = props?.schedules;
  const errorSchedules = props?.errorSchedules;
  const [isLogged, setLogged] = React.useState(false);

  const handleRequest = async () => {
    if (props?.useSchedules) await props?.useSchedules(0);
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleRequest();
    // Simulate a network request or fetch new data
    setTimeout(() => {
      // Replace this with actual data fetching or update logic
      setRefreshing(false);
    }, 2000); // Simulated delay for demonstration purposes (2 seconds)
  };
  React.useEffect(()=>{
    setRefreshing(false);
  },[errorSchedules])
  React.useEffect(() => {
    handleRequest();
    (async()=>{
      const userInfo = await AsyncStorage.getItem(keystores.user);
      if (userInfo) {
        const userInfoParsed = await JSON.parse(userInfo);
        if (userInfoParsed?.data && userInfoParsed?.token !== "") {
          return setLogged(true);
        }else{
          return setLogged(false);
        }
      } else {
        return setLogged(false);
      }
    })()
  }, []);
  
  React.useEffect(()=>{
      setTimeout(()=>setStartupLoading(false));
  },[schedules])

  return (
    <Layout
      loading={homeLoading || refreshing }
      centerTitle={I18n.t("homepage")}
      handleLeftMenus={() => props.navigation.toggleDrawer()}
      handleRightNotification={() =>
        NavigationService.navigate(navRoutes.NOTIFICATION, null)
      }
    >
      <React.Fragment>
      {schedules?.message === "success" &&
      Array.isArray(schedules?.data) &&
      schedules?.data?.[0] ? (
        <>
          <View style={[styles.container, { flex: 0.4 }]}>
            <Image source={MLwithHRD} style={styles.imageLogo} />
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.bodyScroll}
          >
            {schedules?.data?.map((schedule, index) => (
              <Schedule 
              logged={isLogged}
              data={schedule} key={schedule?.data?.id || index} />
            ))}
          </ScrollView>
        </>
      ) :
      isStartupLoading ?
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicatorTheme color={themes.Primary.mainColor} size='large'style={{marginBottom:10}}/>
        <Text style={{color:themes.Primary.mainColor}}>
          {I18n.t('loading')}
        </Text>
      </View>
      :(<NoSchedule />)
    }
      </React.Fragment>
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
    flex: 0.45,
    paddingHorizontal: 30,
    backgroundColor: themes.Primary.background,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
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
