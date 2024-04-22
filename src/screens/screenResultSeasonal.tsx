import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Linking,
  Image,
  RefreshControl,
  ActivityIndicator,
  Alert
} from "react-native";
import Layout from "../layout";
import I18n from "../i18n";
import themes from "../themes";
import NavigationServer from "../services/navgationService";
import { showMessage } from "react-native-flash-message";
import { navRoutes } from "../navigation/navRoutes";
import moment from "moment";
import {API_URL_SWP} from '../api/config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keystores } from "../constants";

export default function ScreenResultSeasonal(props: any) {
  const resultProfileSeasonal=props?.resultProfileSeasonal;
  const [key, setKey] = React.useState(0)
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isErrorImage,setErrorImage]=React.useState(false);
  const [isLoadingImage,setLoadingImage]=React.useState(true);
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
        duration: 3500,
      });
      setLoading(false);
     
      setTimeout(()=>setRefreshing(false),3000);
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
        resultTitle={`អ្នកបានស្នើសុំមកកាន់`}
        resultSubTitle={"HRD-Korea រួចរាល់"}
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
          {
            isErrorImage ?
            <View style={{
              borderWidth:1,
              height:180,
              width:120,
              justifyContent:'center',
              alignItems:'center',
              borderColor:themes.Primary.colorGrey
            }}>
              {isLoadingImage ? <ActivityIndicator
              color={themes.Primary.mainColor}
              size='small'
            />:null}
            </View>
            :
              !isLoading?
              <Image
                source={{uri:
                `${API_URL_SWP}/image/${isResultProfile?.folder}/${isResultProfile?.image}`
                ,cache:'reload'}}
                resizeMode="contain" style={{ height: 200,width:'100%' }} />:null
            }
          <Text style={{ fontSize: 28,
            marginTop:15,
            alignSelf: "center",color:themes.Primary.colorTextBlack }}>
            {isResultProfile?.name || ''}
          </Text>
          <Text style={{ fontSize: 18, alignSelf: "center",color:themes.Primary.colorTextBlack }}>
            នាមត្រកូលនិង នាមខ្លួនជាអក្សរឡាតាំង
          </Text>
          <View style={styles.codeExam}>
            <Text style={styles.txt_examcode}>
              {isResultProfile?.codeExam || 'N / A'}
            </Text>
            <Text style={styles.txt_examlbl}>លេខកូដប្រឡង</Text>
          </View>
          <View style={styles.blogTxt}>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 18,
                color: "black",
                marginTop: 20,
              }}
            >
              {isResultProfile?.passport || 'N / A'}
            </Text>
            <Text style={styles.txt_form}>
              លេខអត្តសញ្ញាណប័ណ្ណ ឬលេខលិខិតឆ្លងដែន
            </Text>
           
            <Text style={styles.txt_form}>
              ប្រភេទការងារ៖ <Text style={{ fontSize: 20 }}>
              {isResultProfile?.mainJobName || 'N / A'}
              </Text>
            </Text>
            <Text style={styles.txt_form}>
              ការងារបន្ទាប់បន្សំ៖ <Text style={{ fontSize: 20,color:themes.Primary.colorTextBlack }}>
              {isResultProfile?.jobName || 'N / A'}
              </Text>
            </Text>
            <Text style={[styles.txt_form]}>
              អាស័យដ្ឋាន
            </Text>
            <Text style={{ fontSize: 14,color:themes.Primary.colorTextBlack }}>
              {isResultProfile?.place || 'N / A'}
              </Text>
            <Text style={{ fontSize: 18, alignSelf: "center", marginTop: 30,color:themes.Primary.colorTextBlack  }}>
              កាលបរិច្ឆេទចុះឈ្មោះសុំធ្វើតេស្ត៖
            </Text>
            <Text
              style={{ fontSize: 18, alignSelf: "center", marginBottom: 30,color:themes.Primary.colorTextBlack }}
            >
              {moment(isResultProfile?.created).format('DD/MM/YYYY') || 'N / A'}
            </Text>
          </View>
          <View
            style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}
          ></View>
        </ScrollView>
        <View
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            backgroundColor: themes.Primary.mainColor,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              paddingEnd: 10,
              paddingStart: 10,
            }}
          >
            សូមរង់ចាំការប្រកាសកាលបរិច្ឆេទប្រឡងតេស្ត នៅលើ
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://mtosb.gov.kh/");
              }}
            >
              <Text
                style={{
                  color: "yellow",
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
                  color: "yellow",
                  textAlign: "center",
                  textDecorationLine: "underline",
                }}
              >
                ទំព័រហ្វ៊េសបុកផ្លូវការ
              </Text>
            </TouchableOpacity>
            <Text
              style={{ textAlign: "center", color: "white", marginStart: 5 }}
            >
              និង App​​​ របស់ គ.ប.ប.ព.ប
            </Text>
          </View>
        </View>
      </Layout>
    </>
  );
}
const styles = StyleSheet.create({
  codeExam: {
    backgroundColor: "#cfd8dc",
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "center",
    borderWidth: 0,
    width: "80%",
    borderRadius: 10,
    color:themes.Primary.colorRed
  },
  txt_examcode: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color:themes.Primary.colorTextBlack,
  },
  txt_examlbl: {
    textAlign: "center",
    fontSize: 14,
    color:themes.Primary.colorTextBlack
  },
  viewHerder: {
    paddingTop: 10,
    flex: 0.1,
    flexDirection: "row",
  },
  user: {
    height: 160,
    width: 160,
    alignSelf: "center",
  },
  txtNoPay: {
    marginTop: 5,
    fontSize: 25,
    color: "red",
    alignSelf: "center",
  },
  txtPay: {
    marginTop: 5,
    fontSize: 25,
    color: "#00c853",
    alignSelf: "center",
  },
  blogTxt: {
    textAlign: "left",
    paddingEnd: "10%",
    paddingStart: "10%",
    marginBottom: 100,
  },
  txt_form: {
    marginTop: 5,
    fontSize: 16,
    textAlign: "center",
    color:themes.Primary.colorTextBlack
  },
  combobox_paymentlogout: {
    flexDirection: "row",
  },
  combobox_paymentlogout_butto: {
    flex: 0.5,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
});
