import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
  Dimensions,
} from "react-native";
import Layout from "../layout";
import {
  MLwithHRD,
  IcForm,
  IcNotificationWhite,
  IcTermOfUseWhite,
  IcQuestionWhite,
  IcContact,
  IcAboutUs,
  IcFormSWPA
} from "../assets";
import I18n from "../i18n";
import themes from "../themes";
import NavigationService from "../services/navgationService";
import { navRoutes } from "../navigation/navRoutes";
import { ResponseSchedule } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keystores } from "../constants";
import { showMessage } from "react-native-flash-message";

const { width } = Dimensions.get('window');

export default function ScreenHome(props: any) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadingSWP, setLoadingSWP] = React.useState(true);
  const homeLoading = props?.homeLoading;
  const schedules: ResponseSchedule = props?.schedules;
  const errorSchedules = props?.errorSchedules;
  const [isLogged, setLogged] = React.useState(false);
  const [isSWPinfo, setSWPinfo] = React.useState({});

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
    setLoadingSWP(true);
    AsyncStorage.getItem(keystores.sideInfo).then((info)=>{
      if(info && typeof info!='undefined'){
        const parseInfo=JSON.parse(info);
        setSWPinfo({
          active:parseInfo.activeSWP,
          title:parseInfo.titleSWP
        })
      }
    }).finally(()=>{
      setLoadingSWP(false);
    });

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
  const alertMessageErrorLinkInfo=()=>{
    return  showMessage({
      message: I18n.t("messageProblemOnContactInfo"),
      type: "danger",
      backgroundColor: themes.Primary.colorRed100,
      color: "white",
      icon: "warning",
      duration: 7000,
    });
  }
  return (
    <Layout
    loading={homeLoading || refreshing ||loadingSWP }
    handleLeftMenus={() => props.navigation.toggleDrawer()}
  >
      <React.Fragment>
        <>
          <View style={[styles.container, { flex: 0.25 }]}>
            <Image source={MLwithHRD} style={styles.imageLogo} />
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.bodyScroll}
          >
             <View style={styles.container}>
              <View style={styles.gridContainer}>
          <TouchableOpacity 
          onPress={()=>NavigationService.navigate(navRoutes.FORM)}
          style={styles.gridItem}>
          <View
           style={styles.styBtn}
           >
            <IcForm width={75} height={75}/>
          </View>
          <Text style={styles.txtLabel}>{`${I18n.t('byForm')}`}</Text>
          </TouchableOpacity>
          {
            typeof Object(isSWPinfo).active!=='undefined' &&
            Object(isSWPinfo).active &&  Object(isSWPinfo).active>0
            ?
          <TouchableOpacity 
          onPress={()=>NavigationService.navigate(navRoutes.FORM_SEASONAL)}
          style={styles.gridItem}>
          <View
           style={styles.styBtn}
           >
            <Image source={IcFormSWPA} style={{width:90,height:90}} />
          </View>
          <Text style={styles.txtLabel}>{`${Object(isSWPinfo).title}`}</Text>
          </TouchableOpacity>:null
          }
          <TouchableOpacity 
          onPress={()=>NavigationService.navigate(navRoutes.NOTIFICATION)}
          style={styles.gridItem}>
          <View style={styles.styBtn}>
            <IcNotificationWhite width={75} height={75}/>
          </View>
          <Text style={styles.txtLabel}>{`${I18n.t('notification')}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>NavigationService.navigate(navRoutes.GUIDE)}
          style={styles.gridItem}>
          <View style={styles.styBtn}>
            <IcQuestionWhite width={85} height={85}/>
          </View>
          <Text style={styles.txtLabel} numberOfLines={1}>{`${I18n.t('desc')}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>NavigationService.navigate(navRoutes.TERMOfUSE)}
          style={styles.gridItem}>
          <View style={styles.styBtn}>
            <IcTermOfUseWhite width={75} height={75}/>
          </View>
          <Text style={styles.txtLabel} numberOfLines={1}>{`${I18n.t('termOfUse')}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>NavigationService.navigate(navRoutes.INFO)}
          style={styles.gridItem}>
          <View style={styles.styBtn}>
            <IcContact width={75} height={75}/>
          </View>
          <Text style={styles.txtLabel} numberOfLines={1}>{`${I18n.t('contactToMe')}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity  
          onPress={()=>NavigationService.navigate(navRoutes.ABOUT)}
          style={[styles.gridItem]}>
          <View style={styles.styBtn}>
            <IcAboutUs width={75} height={75}/>
          </View>
          <Text style={styles.txtLabel} numberOfLines={1}>{`${I18n.t('aboutMe')}`}</Text>
          </TouchableOpacity>
              </View>
            </View>
            <View style={{height:100}}></View>
          </ScrollView>
        </>
      </React.Fragment>
      </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "flex-end",
  },
  bodyScroll: {
    flex: 0.45,
    paddingVertical:10,
    backgroundColor: themes.Primary.backgroundMainLight,
  },
  txtLabel: {
    fontFamily: themes.FontFamily.Hanuman,
    fontSize: 16,
    textAlign: "center",
    marginTop:8,
    color: themes.Primary.colorTextWhite,
  },
  imageLogo: {
    flex: 0.8,
    height: "100%",
    marginEnd: 5,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    marginTop: -180,
    alignContent: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'flex-start'
  },
  gridItem: {
    width: width/2, // Divide the screen width by 3 for 3 columns
    justifyContent: 'center',
    alignItems: 'center',
  },
  styBtn:{
    backgroundColor:themes.Primary.backgroundMainDark,
    justifyContent:'center',
    alignItems:"center",
    borderRadius:100,
    width: 135, // Divide the screen width by 3 for 3 columns
    height: 135,
    marginTop:15
  }
});
