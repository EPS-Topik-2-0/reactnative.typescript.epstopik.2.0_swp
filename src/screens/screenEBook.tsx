import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
  Alert,
  Linking
} from "react-native";
import {
  ThumbnailLoading,
} from "../components";
import Layout from "../layout";
import {
  IcGuide,
} from "../assets";
import I18n from "../i18n";
import themes from "../themes";
import NavigationService from "../services/navgationService";
import { navRoutes } from "../navigation/navRoutes";
import axios from "axios";
import qs from 'qs';
import CryptoJS from 'crypto-js';

function LinkVideo({data}:any) {
  return (
    <TouchableOpacity
    onPress={()=>NavigationService.navigate(navRoutes.YOUTUBE,{link:data?.link})}
    style={{ marginBottom: 15 }}>
      <View
        style={[
          {
            height: 280,
            borderRadius: 10,
            shadowColor: themes.Primary.colorGrey,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 2,
            backgroundColor: themes.Primary.background,
            paddingHorizontal: 15,
            paddingVertical: 10,
          },
        ]}
      >
        <View
          style={{
            flex: 0.15,
            flexDirection: "row",
          }}
        >
          <IcGuide width={20} height={20} />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              marginLeft: 10,

              fontFamily: themes.FontFamily.HanumanBold,
              color: themes.Primary.colorTextBlack,
            }}
          >
            {data?.name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {
            !data?.alias || data?.alias ===''?
            <ThumbnailLoading />:
            <Image
              source={{uri:`${data?.alias}`}}
              resizeMode="contain" style={{ height:"100%",width:'100%' }}
               /> 
          }
        </View>
        <View
          style={{
            flex: 0.2,
            marginTop: 10,
            flexDirection: "row",
          }}
        >
          <Text
            numberOfLines={2}
            style={{ fontSize: 12, fontFamily: themes.FontFamily.Hanuman }}
          >
           {data?.desc}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ScreenGuide(props: any) {
  const videos = props?.videos;
  const [refreshing, setRefreshing] = React.useState(false);
  
  const handleRequest = async () => {
    if (props?.useVideos) await props?.useVideos();
  };
  React.useEffect(() => {
    handleRequest();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    handleRequest();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const handleAuthToken=async(callback:(res:unknown)=>void)=>{
    // 1. required auth token
    const data = {
      username: "online.hrddeeplink",
      password: "914bade01fd32493a0f2efc583e1a5f6",
      client_id: "third_party",
      client_secret: "16681c9ff419d8ecc7cfe479eb02a7a",
      grant_type: "password"
    };
    const URL_WING_DEEP_LINK = "https://ir.wingmoney.com:9443/RestEngine";
    try {
      const formData = qs.stringify(data);
      axios.post(`${URL_WING_DEEP_LINK}/oauth/token`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => {
        return callback({
          err_code:200,
          data:response.data
        });
      })
      .catch(error => {
        return callback({
          err_code:400,
          data:error
        });
      });
    } catch (er) {
      return callback({
        err_code:400,
        data:er
      })
    }
  }
  const handleEncryptHash=(dataMake:unknown,callback:(res:unknown)=>void)=>{
    try {
      const aToken = Object(dataMake).access_token;
      const payloadData = dataMake;
      const amount = parseFloat(Object(payloadData)?.amount).toFixed(2);
      const currency = Object(payloadData)?.currency;
      const merchant_id = Object(payloadData)?.merchant_id;
      const order_reference_no = Object(payloadData)?.order_reference_no;
      const schema_url = Object(payloadData)?.schema_url;
      const token = aToken;
      const password = `${token}`.replace(/-/g, "");
      const SALT = "WINGBANK";
  
      // Create a key using PBKDF2
      const key = CryptoJS.PBKDF2(password, SALT, { keySize: 32 / 4, iterations: 65536, hasher: CryptoJS.algo.SHA256 });
  
      const strdt_org = `${amount}#${currency}#${merchant_id}#${order_reference_no}#${schema_url}`;
      // Step 1: Base64 encoding
      const step1Base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(strdt_org));
      // Step 2: AES encryption
      const payloadEncrypted = CryptoJS.AES.encrypt(step1Base64, key, { iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000') }).toString();
      // Step 3: Base64 encoding
      const step3Base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(payloadEncrypted));
      // Step 4: SHA256 hash
      const stringHash = CryptoJS.SHA256(step3Base64).toString(CryptoJS.enc.Hex).toUpperCase();
  
      const requestData = {
        username: merchant_id,
        hash: stringHash,
        sandbox: strdt_org,
        token: password,
        payloadData: payloadData
      };
  
      return callback({ data: requestData, err_code: 200 });
    } catch (error) {
      return callback({ data: error, err_code: 400 });
    }
  }
  const handleCreatingDeepLink=(data:unknown,token:unknown,callback:(res:unknown)=>void)=> {
    try {
    const URL_WING_DEEP_LINK="https://ir.wingmoney.com:9443/RestEngine/api/v4/generatedeeplink"
    axios.post(`${URL_WING_DEEP_LINK}`, data, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      return callback({
        err_code:200,
        data:response.data
      })
    })
    .catch(error => {
      return callback({
        err_code:400,
        data:error
      })
    });
    } catch (er) {
      return callback({
        err_code:400,
        data:er
      })
    }
  }
  const handleWING=()=>{
    const amount = 0.01;
    const currency = 'USD';
    const merchant_id = '4783';
    const merchant_name = 'HRD-Korea';
    const order_reference_no = "test00001";
    const schema_url = "payment://wingbank";
    const item_name= "Payin";
    const integration_type= "MOBAPP";
    console.log('click')
    handleAuthToken((res)=>{
      console.log('auth',Object(res)?.data?.access_token)
      if(res && Object(res)?.err_code===200){
        const auth=Object(res)?.data?.access_token;
        let dataMakeHash ={
          amount,
          currency,
          merchant_id,
          merchant_name,
          order_reference_no,
          schema_url,
          access_token:auth
        }
        handleEncryptHash(dataMakeHash,(resHash:unknown)=>{
          console.log('hash',Object(resHash).data.hash)
          const access_token=auth;
          const hash=Object(resHash).data.hash;
          let dataDeep={
              "order_reference_no":order_reference_no,
              "amount":amount,
              "currency":currency,
              "merchant_name":merchant_name,
              "merchant_id":merchant_id,
              "item_name":item_name,
              "schema_url":schema_url,
              "txn_hash":hash,
              "product_detail":[],
              "integration_type":integration_type
          }
          handleCreatingDeepLink(dataDeep,access_token,(resDeep:unknown)=>{
            console.log('redirect_url',Object(resDeep)?.data)
            if(resDeep && Object(resDeep)?.err_code===200){
              console.log(`${Linking.canOpenURL(`${Object(resDeep)?.data?.redirect_url}`)}`)
              Linking.openURL(`${Object(resDeep)?.data?.redirect_url}`);
            }else{
              Alert.alert("Invalid DeepLink")
            }
          })
        })
      }else{
        console.log("Invalid WING Auth");
        Alert.alert("Invalid WING Auth");

      }
    })
  }
  return (
    <Layout
      centerTitle={I18n.t("document")}
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
        {/* {videos?.message === "success" &&
        Array.isArray(videos?.data)
          ? videos?.data?.map((data:any) => (
          <LinkVideo key={data.id} data={data} />
        )):null
      } */}
        <TouchableOpacity onPress={()=>handleWING()}>
          <Text>WING PAY AA</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
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
