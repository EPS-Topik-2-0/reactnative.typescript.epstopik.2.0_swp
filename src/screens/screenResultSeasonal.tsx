import React from "react";
import {
  Text,
  ScrollView,
  RefreshControl,
  Alert
} from "react-native";
import Layout from "../layout";
import I18n from "../i18n";
import themes from "../themes";
import NavigationServer from "../services/navgationService";
import { showMessage } from "react-native-flash-message";
import { navRoutes } from "../navigation/navRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keystores } from "../constants";

export default function ScreenResultSeasonal(props: any) {
  const resultProfileSeasonal=props?.resultProfileSeasonal;
  const [key, setKey] = React.useState(0)
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
 const [isResultProfile, setResultProfile] = React.useState<
  {
    birthday: string, 
    codeExam: string, 
    created:string,
    folder: string, 
    gender: string, 
    image:string, 
    jobName:string, 
    mainJobName:string, 
    name: string, 
    passport: string, 
    phone: string,
    place:string
  }
  >();

  React.useEffect(()=>{
    handleRequest();
  },[]);

  // RESULT PROFILE
  React.useEffect(()=>{
    if(typeof resultProfileSeasonal!=='undefined' && (isLoading || refreshing)){
      if(resultProfileSeasonal && resultProfileSeasonal?.message==='success'){
        setResultProfile({
          ...resultProfileSeasonal?.data[0]
        });
      }else{
        if(resultProfileSeasonal && resultProfileSeasonal?.message==='empty'){
          Alert.alert(
            `${I18n.t('titleGotResultInfo')}`,
            `${I18n.t('cannotGotResultInfo')}`,
            [
              {
                text: `${I18n.t('confirm')}`,
                onPress: () => NavigationServer.reset(navRoutes.MAIN),
              },
            ],
            { cancelable: false }
          );
        }
      }
    }

  },[resultProfileSeasonal]);

  React.useEffect(()=>{
    if(refreshing){
      showMessage({
        message: I18n.t("messageRefetchDataResultProfile"),
        type: "success",
        backgroundColor: themes.Primary.success,
        color: "white",
        icon: 'success',
        duration: 2000,
      });
      setLoading(false);
     
      setTimeout(()=>setRefreshing(false),1000);
    }
  },[refreshing])
  
  const handleRequest = async () => {
    setLoading(true);
    AsyncStorage.getItem(keystores.scheduleSeasonalInfo).then((res)=>{
     if(res && typeof res !=='undefined'){
      const scheduleSeasonal=JSON.parse(res);
      if (props?.useResultProfileSeasonal) props?.useResultProfileSeasonal({ schedule: scheduleSeasonal?.id })
     }else{
          setTimeout(()=>{
            setLoading(false);
            NavigationServer.reset(navRoutes.MAIN);
          },3000)
        }
    }).finally(()=>{
      setTimeout(()=> setLoading(false),3000)
    })
  };
  const onRefresh = () => {
    setRefreshing(true);
    handleRequest();
    setKey(key+1);
  };
  return (
    <>
      <Layout
        typeHeaderResultSeasonal
        labelLoading={`${I18n.t('loading')}`}
        loading={isLoading || refreshing}
        handleLeftMenus={() => props.navigation.toggleDrawer()}
        handleRightNotification={() => NavigationServer.navigate(navRoutes.NOTIFICATION)}
      >
        <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          style={{ flex: 0.88, paddingTop: 60 }}
          contentContainerStyle={{
            justifyContent: "center",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <Text
          style={{
            marginTop:-100,
            textAlign: "center",
            fontSize: 18,
            fontFamily: themes.FontFamily.MuolLight,
            color: themes.Primary.success,
          }}
        >
          {I18n.t("messageThankSWP")}
        </Text>
           <Text
              style={{
                width:220,
                fontSize:15,
                fontFamily:themes.FontFamily.Hanuman,
                textAlign: "center",
                color: themes.Primary.colorTextBlack,
              }}
            >
              {I18n.t("messageSuccessSWP")}
            </Text>
        </ScrollView>
      </Layout>
    </>
  );
}

