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
  ActivityIndicator
} from "react-native";
import Layout from "../layout";
import I18n from "../i18n";
import themes from "../themes";
import { useRoute } from '@react-navigation/native';
import NavigationServer from "../services/navgationService";
import { showMessage } from "react-native-flash-message";
import { navRoutes } from "../navigation/navRoutes";
import moment from "moment";
import {ImUserOld} from '../assets';
import {axios} from "../api/";
import { 
  API_HOST
   } from '@env';

export default function ScreenLogin(props: any) {
  const route = useRoute();
  const dataSchedule = route.params as any;
  const resultProfile=props?.resultProfile;
  const errorResultProfile=props?.errorResultProfile;
  const [key, setKey] = React.useState(0)
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [isImageProfile,setImageProfile]=React.useState('');
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
  }
  >();
  const [isScheduleInfo,setScheduleInfo]=React.useState<{
    aba: number,
    bakong: number, 
    dateEnd:string,
    dateStart:string, 
    folder:string, 
    id: number, 
    maxBirthday:string, 
    minBirthday:string, 
    name:string, 
    open: number, 
    price:number, 
    special: number, 
    status: number, 
    wing: number
  }>({
    aba: 0, 
    bakong: 0, 
    dateEnd:"",
    dateStart: "",
    folder:"",
    id: 0, maxBirthday: "", 
    minBirthday: "",
    name: "",open: 0, price: 28, 
    special: 0, status: 1, wing: 0
  });

  const getProfile = async (payload: any) => {
    try {
      const response = await axios.get('result-form/'+ 0 + "/" + new Date().getTime());
      if (Object(response?.data)?.message === 'success') {
        setResultProfile({
          ...Object(response)?.data?.data[0]
        });
        setLoading(false);
      }else{
        setTimeout(()=>{
          setLoading(false);
          NavigationServer.reset(navRoutes.MAIN);
        },3000)
      }
    } catch (error) {
      setTimeout(()=>{
        setLoading(false);
        NavigationServer.reset(navRoutes.MAIN);
      },3000)
    }
  };

  React.useEffect(()=>{
    setRefreshing(true);
    getProfile({schedule:dataSchedule?.id});
    // Not Login 
    if(dataSchedule && dataSchedule?.id>0){
      setScheduleInfo({...dataSchedule});
    }
  },[dataSchedule]);

  // RESULT PROFILE
  React.useEffect(()=>{
    if(resultProfile && resultProfile?.message==='success'){
      const data=resultProfile?.data[0];
      const url="https://epstopikapi.mtosb.gov.kh/V2/api"+'/images?class='+data?.folder+'&code='+data?.image;
      setResultProfile({
        ...resultProfile?.data[0]
      });
      setImageProfile(``);
      setTimeout(()=>{
        setImageProfile(url);
      },1000);
    }

    if(refreshing){
      showMessage({
        message: I18n.t("messageRefetchDataResultProfile"),
        type: "success",
        backgroundColor: themes.Primary.success,
        color: "white",
        icon: 'success',
        duration: 7000,
      });
      setLoading(false);
     
      setTimeout(()=>setRefreshing(false),3000);
    }
  },[resultProfile,refreshing]);

  // RESULT PROFILE
  React.useEffect(()=>{
    if(errorResultProfile && errorResultProfile?.message==='empty'){
      // Alert.alert(
      //   `${I18n.t('titlePleaseRequiredLogin')}`,
      //   `${I18n.t('messagePleaseRequiredLogin')}`,
      //   [
      //     {
      //       text: `${I18n.t('login')}`,
      //       onPress: () => NavigationServer.reset(navRoutes.MAIN),
      //     },
      //   ],
      //   { cancelable: false }
      // );
    }
  },[errorResultProfile]);
  
  const handleRequest = async () => {
    getProfile({schedule:isScheduleInfo?.id});
  };
  const onRefresh = () => {
    setRefreshing(true);
    handleRequest();
    setKey(key+1);
    const url="https://epstopikapi.mtosb.gov.kh/V2/api"+'/images?class='+isResultProfile?.folder+'&code='+isResultProfile?.image;
    setImageProfile(``);
    setTimeout(()=>{
      setImageProfile(url);
    },1000);
  };
  return (
    <>
      <Layout
        typeHeaderResult
        labelLoading={`${I18n.t('loading')}`}
        loading={isLoading || refreshing}
        handleLeftMenus={() => props.navigation.toggleDrawer()}
        resultTitle={`អ្នកបានបង់ប្រាក់ជូន`}
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
                `https://epstopikapi.mtosb.gov.kh/v2/image/${isResultProfile?.folder}/${isResultProfile?.image}`
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
            backgroundColor: "#869b00",
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
