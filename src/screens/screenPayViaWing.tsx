import React from "react";
import {
  Platform,
  Alert,
  Dimensions
} from "react-native";
import Layout from "../layout";
import I18n from "../i18n";
import { WebView } from "react-native-webview";
import NavigationServer from "../services/navgationService";
import { useRoute } from '@react-navigation/native';
import CryptoJS from 'crypto-js';
import moment from "moment";
import { WING_ONLINE_URL,
WING_CHECK_TRANSACTION,
REFERER,
WING_KEY,
HASH,
USERNAME_WING
} from '@env';
import {axios} from "../api";
import { navRoutes } from "../navigation/navRoutes";
import LoadingPayment from "../components/LoadingPayment";
import {sendMessagePushBackError} from '../helper';

   const windowWidth = Dimensions.get('window').width;
   const windowHeight = Dimensions.get('window').height;
   
export default function ScreenWing(props: any) {
  const [isShowAlert, setShowAlert] = React.useState(true);
  let paymentInterval: string | number | NodeJS.Timeout | undefined;
  const {params} = useRoute();
  const token = Object(params)?.token || '';
  const tran_id = Object(params)?.tran_id || '';
  const amount = Object(params)?.amount || '';
  const phone = Object(params)?.phone || '';
  const schedule = Object(params)?.schedule || '';
  const userId=Object(params)?.userId || '';
  const [isLoadingPayment, setLoadingPayment] = React.useState(false);
  const supperClearVerify = () => {
    setLoadingPayment(false);
    clearInterval(paymentInterval);
  }
   // checkPayment
  const checkPaymentStatus = async () => {
    const data={
      username: USERNAME_WING,
      order_reference_no: tran_id,
      rest_api_key: WING_KEY,
      sandbox: "0"
    }
    try{
      fetch(WING_CHECK_TRANSACTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          if(data?.errorCode==='200'){
            setLoadingPayment(true);
            const newDate = moment(new Date()).format('YYYYMMDDHHmmss');
            pushBackMobileWING({
              req_time: newDate,
              tran_id: tran_id,
              amount: amount,
              device: Platform.OS === 'ios' ? 'ios' : 'android',
              phone,
              schedule,
              userId,
              payment:'WING'
            })
          }
        })
        .catch(error => {
         console.log('resE',error)
        });
  } catch (error) {
    console.log('error',error)
  }
  };
  const pushBackMobileWING = async (payload: any) => {
    const {
      req_time,
      tran_id,
      amount,
      device,
      phone,
      schedule,
      userId,
      payment
    }=payload;
    try {
      const dataToHash = req_time + tran_id+amount+device+phone+schedule+userId+payment;
     // Convert the key to WordArray (required by CryptoJS)
     const keyWordArray = CryptoJS.enc.Utf8.parse(HASH);
   
     // Calculate HMAC-SHA512 hash
     const hmacSha512 = CryptoJS.HmacSHA512(dataToHash, keyWordArray);
   
     // Convert the hash to a Base64-encoded string
     const base64EncodedHash = CryptoJS.enc.Base64.stringify(hmacSha512);
     const data = {
      hash:base64EncodedHash,
      tran_id,req_time,amount,device,phone,schedule,id:userId,payment
     };
     const response = await axios.post('push-back-mobile', data, {
        headers: {
          Referer: REFERER,
        },
      });
      if (Object(response?.data)?.message === 'success') {
        clearInterval(paymentInterval);
        // Clear the interval if payment is successful
        NavigationServer.reset(navRoutes.CARD);
      }else{
        if (props?.useResultProfile) props?.useResultProfile({ schedule: schedule })
      }
    } catch (error:any) {
      console.log(error,error?.status)
      if(isShowAlert===true && error){
        setShowAlert(false);
           const errorBody=error?.data;
           Alert.alert(
             `ការផ្ទៀងផ្ទាត់លើការបង់ប្រាក់ជួបបញ្ហា`,
             `សូមធ្វើការទំនាក់ទំនង់មកកាន់យើងខ្ញុំ ដោយភ្ជាប់មកនូវ 
               លេខទូរស័ព្ទ​៖ ${phone} 
               និងលេខកូដបង់ប្រាក់៖ ${tran_id}​`,
             [
               {
                 text: `${I18n.t('confirm')}`,
                 onPress: async () =>  {
                    await clearInterval(paymentInterval);
                    await setShowAlert(false);
                    const messageToTelegram=`${
                     req_time+' | ' + tran_id + ' | '+ amount + ' | '+
                     device + ' | ' + phone + ' | '+
                     schedule + ' | ' +
                     userId +' | '+
                     payment+ ' | [' }`;
                    await setLoadingPayment(false);
                    await sendMessagePushBackError(messageToTelegram + `${JSON.stringify(errorBody)} ]`);
                 },
               },
             ],
             { cancelable: false }
           );
       }
       return setShowAlert(false);
    }
  };
  React.useEffect(()=>{
    if(token!=='' && tran_id!==''){
      paymentInterval = setInterval(() => {
        checkPaymentStatus();
      }, 3000);
    }
    
  },[]);
  return (
    <Layout
      backgroundMainColor
      centerTitle={I18n.t("viaWing")}
      handleLeftBack={() => {
        Alert.alert(
          `${I18n.t('messageWaining')}`,
          `${I18n.t('messageCancelWing')}`,
          [
            {
              text: `${I18n.t('noConfirm')}`,
            },
            {
              text: `${I18n.t('confirm')}`,
              onPress: async () =>  {
                await clearInterval(paymentInterval);
                await NavigationServer.goBack();
              },
            },
          ],
          { cancelable: false }
        );
      }}
      handleLeftBackLabel={' '}
    >
      <WebView
            setBuiltInZoomControls={false}
            source={{ uri: WING_ONLINE_URL+ "?token="+ token }}
            style={{ marginTop: -70, width:windowWidth, height: windowHeight }}
        />
        {isLoadingPayment?
        <LoadingPayment
        cancelVerifySuper={()=>supperClearVerify()}
          />  :null
        }
    </Layout>
  );
}

