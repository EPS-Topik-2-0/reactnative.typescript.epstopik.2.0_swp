import React from "react";
import {
  StyleSheet,
  Platform,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Layout from "../layout";
import I18n from "../i18n";
import themes from "../themes";
import { WebView } from "react-native-webview";
import NavigationServer from "../services/navgationService";
import { useRoute } from '@react-navigation/native';
import CryptoJS from 'crypto-js';
import moment from "moment";
import { ABA_PAYWAY_KEY,
  ABA_PAYWAY_MERCHANT_ID,
  REFERER,
  ABA_PAYWAY_CHECK_TRANSACTION,
  HASH,
   } from '@env';
   import {axios} from "../api";
   import { navRoutes } from "../navigation/navRoutes";
   import {sendMessagePushBackError} from "../helper";


export default function ScreenBakong(props: any) {
  const [isShowAlert, setShowAlert] = React.useState(true);
  let paymentInterval: any;
  const {params} = useRoute();

  const url = Object(params)?.url || '';
  const tran_id = Object(params)?.tran_id || '';
  const amount = Object(params)?.amount || '';
  const phone = Object(params)?.phone || '';
  const schedule = Object(params)?.schedule || '';
  const userId=Object(params)?.userId || '';
    // checkPayment
    const checkPaymentStatus = async (payload: any) => {
      try {
        const {
          tran_id,
          amount,
          schedule,
          phone,
        } = payload;
        const newDate = moment(new Date()).format('YYYYMMDDHHmmss');
        const dataToHash = newDate + ABA_PAYWAY_MERCHANT_ID + tran_id;
        const keyWordArray = CryptoJS.enc.Utf8.parse(ABA_PAYWAY_KEY);
        const hmacSha512 = CryptoJS.HmacSHA512(dataToHash, keyWordArray);
        const base64EncodedHash = CryptoJS.enc.Base64.stringify(hmacSha512);
        const data = new FormData();
        data.append("hash", base64EncodedHash);
        data.append("tran_id", tran_id);
        data.append("req_time", newDate);
        data.append("merchant_id", ABA_PAYWAY_MERCHANT_ID);
        const response = await fetch(ABA_PAYWAY_CHECK_TRANSACTION, {
            method: 'POST',
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Referer': REFERER,
          },
          });
    
         if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        if (Object(responseData)?.status === 0) {
          // Clear the interval if payment is successful
         pushBackMobileABA({
            req_time: newDate,
            tran_id: tran_id,
            amount: amount,
            device: Platform.OS === 'ios' ? 'ios' : 'android',
            phone,
            schedule,
            userId,
            payment:'ABA',
            
          });
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };
    const pushBackMobileABA = async (payload: any) => {
      const {
        req_time,
        tran_id,
        amount,
        device,
        phone,
        schedule,
        userId,
        payment,
        
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
          return Object(response?.data)
        }else{
          if (props?.useResultProfile) props?.useResultProfile({ schedule: schedule })
        }
      } catch (error:any) {
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
                  onPress: () =>  {
                    clearInterval(paymentInterval);
                    setShowAlert(false);
                    const messageToTelegram=`${
                      req_time+' | ' + tran_id + ' | '+ amount + ' | '+
                      device + ' | ' + phone + ' | '+
                      schedule + ' | ' +
                      userId +' | '+
                      payment+ ' | [' }`;
                    sendMessagePushBackError(messageToTelegram + `${JSON.stringify(errorBody)} ]`);
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
    if(url!=='' && tran_id!==''){
      paymentInterval = setInterval(() => {
        const newDate = moment(new Date()).format('YYYYMMDDHHmmss');
        checkPaymentStatus({
          req_time:newDate,
          tran_id,
          phone,
          amount,
          schedule,
          showAlert:isShowAlert
        });
      }, 5000);
    }
   
  },[]);
  
  return (
    <Layout
      backgroundMainColor
      centerTitle={I18n.t("viaBakong")}
      handleLeftBack={() => {
        Alert.alert(
          `${I18n.t('messageWaining')}`,
          `${I18n.t('messageCancelViaBakong')}`,
          [
            {
              text: `${I18n.t('noConfirm')}`,
            },
            {
              text: `${I18n.t('confirm')}`,
              onPress: async() =>  {
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
        originWhitelist={['*']}
        style={{ flex: 1,margin:20 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        setBuiltInZoomControls={false}
        source={{ uri: url }}
        renderLoading={() => (
            <ActivityIndicator
              color='black'
              size='large'
            />
          )}
      />
    </Layout>
  );
}
