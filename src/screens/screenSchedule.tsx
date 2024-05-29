import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  RefreshControl,
  Image,
  Alert,
  Linking,
  Dimensions
} from "react-native";
import {
  TextInput,
  PickerSelect,
  CheckBox,
  PickerImage,
  PreviewForm,
} from "../components";
import Layout from "../layout";
import {
  ABA,
  KHQR,
  WingBank,
  MLwithHRD
} from "../assets";
import I18n from "../i18n";
import { useForm } from "react-hook-form";
import themes from "../themes";
import moment from "moment";
import { Months as ArrayMonths } from "../constants";
import Navigation from "../services/navgationService";
import { navRoutes } from "../navigation/navRoutes";
import NavigationServer from "../services/navgationService";
import { showMessage } from "react-native-flash-message";
import { iJob } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keystores } from "../constants";
import { ABA_PAYWAY_KEY,
  ABA_PAYWAY_MERCHANT_ID,
  ABA_API_PURCHASE,
  REFERER,
  ABA_PAYWAY_CHECK_TRANSACTION,
  HASH,
  ABA_FORM_WRONG_HASH,
   } from '@env';
import CryptoJS from 'crypto-js';
import LoadingPayment from "../components/LoadingPayment";
import {axios} from "../api";
import { trimEmptyString } from "../utils";
import {isValidPhoneNumber,sendMessagePushBackError,wingCreatingTransaction,wingAuthToken,wingHash,
  wingPaymentStatus,
  wingGotoStore
} from "../helper";
const {  height } = Dimensions.get('window');
interface iLabelJob { label: string; value: string | number }[];
function NoSchedule() {
  return (
    <View style={{height:height-120,flex:1,width:'100%'}}>
      <View style={{flex:1,flexDirection:"column",alignItems:'center'}}>
      <View style={{flex:.3,marginTop:50}}>
        <Image source={MLwithHRD} style={styles.imageLogo} />
      </View>
      <View style={{flex:.7,justifyContent:'center',paddingHorizontal:20}}>
        <Text
          style={{
            marginTop:-120,
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
            fontSize:15,
            fontFamily:themes.FontFamily.Hanuman,
            textAlign: "center",
            color: themes.Primary.colorRed100,
          }}
        >
          {I18n.t("wanningNoSchedule1")}
        </Text>
      </View>
      <View
        style={{
          flex:.1,
          backgroundColor: themes.Primary.colorRed100,
          paddingVertical: 10,
          width:'100%'
        }}
      >
        <Text
          style={{ textAlign: "center", color: themes.Primary.colorTextWhite,fontSize:16 }}
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
                fontSize:16,
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
                fontSize:16,
                color: themes.Primary.wanning,
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              ទំព័រហ្វ៊េសបុកផ្លូវការ
            </Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", color: "white", marginStart: 5 ,fontSize:16}}>
            និង App​​​ របស់ គ.ប.ប.ព.ប
          </Text>
        </View>
      </View>
      </View>
    </View>
  );
}

export default function ScreenSchedule(props: any) {
  let paymentInterval: string | number | NodeJS.Timeout | undefined;
  let paymentIntervalWING: string | number | NodeJS.Timeout | undefined;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues
  } = useForm();
  const [refreshing, setRefreshing] = React.useState(true);
  const [isUserInfo, setUserInfo] = React.useState<{
    name: string;
    phone: string;
    id: number;
  }>({
    name: '',
    phone: '',
    id: 0,
  });
  const [isShowAlert, setShowAlert] = React.useState(true);
  const [isPreview, setPreview] = React.useState(false);
  const [isNoSchedule, setNoSchedule] = React.useState(false);
  const [isLoadingPayment, setLoadingPayment] = React.useState(false);
  const [isLoading, setLoading] = React.useState<{
    loading: boolean,
    label: string
    type?: string
  }>({ label: '', loading: false, type: '' });
  const [isJobSelected, setJobSelected] = React.useState<number>(0);
  const [isLastDayOfMonth, setLastDayOfMonth] = React.useState(31);
  const [isScheduleInfo, setScheduleInfo] = React.useState<{
    aba: number,
    bakong: number,
    dateEnd: string,
    dateStart: string,
    folder: string,
    id: number,
    maxBirthday: string,
    minBirthday: string,
    name: string,
    open: number,
    price: number,
    special: number,
    status: number,
    wing: number
  }>({
    aba: 0,
    bakong: 0,
    dateEnd: "",
    dateStart: "",
    folder: "",
    id: 0, maxBirthday: "",
    minBirthday: "",
    name: "", open: 0, price: 28,
    special: 0, status: 1, wing: 0
  });
  const loadingHome = props?.loadingHome;
  const jobs = props?.jobs || [];
  const schedules = props?.schedules || [];
  const errorJobs = props?.errorJobs;
  const errorVerify = props?.errorVerify;
  const verify = props?.verify;
  const submitForm = props?.submitForm;
  const errorSubmitForm = props?.errorSubmitForm;
  const resultProfile = props?.resultProfile;
  const errorResultProfile = props?.errorResultProfile;
  const checkLogged = async () => {
    const userInfo = await AsyncStorage.getItem(keystores.user);
    if (userInfo) {
      const userInfoParsed = await JSON.parse(userInfo);
      if (userInfoParsed?.data && userInfoParsed?.token !== "") {
        setUserInfo({
          name: userInfoParsed?.data?.data?.name,
          id: Number(userInfoParsed?.data?.data?.id),
          phone: userInfoParsed?.data?.data?.phone,
        });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const deepLinkABA = async ({ 
    req_time,
    tran_id,
    amount,
    name,
    phone,
   }: any) => {
    const dataToHash = req_time + ABA_PAYWAY_MERCHANT_ID + tran_id+amount+name+phone+'abapay_deeplink';
    const keyWordArray = CryptoJS.enc.Utf8.parse(ABA_PAYWAY_KEY);
    const hmacSha512 = CryptoJS.HmacSHA512(dataToHash, keyWordArray);
    const base64EncodedHash = CryptoJS.enc.Base64.stringify(hmacSha512);
    const data = new FormData();
    data.append('hash', base64EncodedHash);
    data.append('tran_id', tran_id);
    data.append('amount', amount);
    data.append('firstname', name);
    data.append('phone', phone);
    data.append('req_time', req_time);
    data.append('merchant_id',ABA_PAYWAY_MERCHANT_ID);
    data.append('payment_option','abapay_deeplink');
    try{
      const response = await fetch(ABA_API_PURCHASE, {
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
    const responseData = await response.json(); // Parse response JSON
    setLoadingPayment(true);
    setTimeout(() => {
      Linking.openURL(responseData?.abapay_deeplink)
    }, 1000);

    paymentInterval = setInterval(() => {
      checkPaymentStatus({
        req_time,
        tran_id,
        phone,
        amount,
        schedule: isScheduleInfo?.id
      });
    }, 10000);
    setTimeout(() => {
      clearInterval(paymentInterval);
      setLoadingPayment(false);
      setLoading({loading:false,label:""});
    }, 180000);
    // Use responseData as needed
  } catch (error) {
    console.error('Error:', error);
  }
  }
  // checkPayment
  const checkPaymentStatus = async (payload: any) => {
    try {
      const {
        tran_id,
        amount,
        schedule,
        phone
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
          userId: isUserInfo.id,
          payment:'ABA'
        })
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };
  // pushBackMobile
  const pushBackMobileABA = async (payload: any) => {
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
        setTimeout(() => setLoading({ label: '', loading: false }), 2000);
        Navigation.reset(navRoutes.CARD);
      }else{
        if (props?.useResultProfile) props?.useResultProfile({ schedule: isScheduleInfo.id })
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
                 onPress: async() =>  {
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
  const bakongABA = async ({ 
    req_time,
    tran_id,
    amount,
    name,
    phone,
   }: any) => {
    const dataToHash = req_time + ABA_PAYWAY_MERCHANT_ID + tran_id+amount+name+phone+'bakong';
    const keyWordArray = CryptoJS.enc.Utf8.parse(ABA_PAYWAY_KEY);
    const hmacSha512 = CryptoJS.HmacSHA512(dataToHash, keyWordArray);
    const base64EncodedHash = CryptoJS.enc.Base64.stringify(hmacSha512);
    const data = new FormData();
    data.append('hash', base64EncodedHash);
    data.append('tran_id', tran_id);
    data.append('amount', amount);
    data.append('firstname', name);
    data.append('phone', phone);
    data.append('req_time', req_time);
    data.append('merchant_id',ABA_PAYWAY_MERCHANT_ID);
    data.append('payment_option','bakong');
    try{
      const response = await fetch(ABA_API_PURCHASE, {
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
    if(response.status===200 && response.url && response.url!==ABA_FORM_WRONG_HASH ){
      setLoading({loading:false,label:""});
      NavigationServer.navigate(navRoutes.BAKONG,{
        amount,  
        tran_id,url:response.url,
        phone,
        schedule:isScheduleInfo?.id,
        userId:isUserInfo.id
      })
    }else{
      showMessage({
        message: "សូមអភ័យទោស ការបង់ប្រាក់តាមបាគងបញ្ហា!",
        type: "danger",
        backgroundColor: "red",
        color: "white",
        icon: "warning",
        duration: 3000,
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
  }
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
        clearInterval(paymentIntervalWING);
        // Clear the interval if payment is successful
        NavigationServer.reset(navRoutes.CARD);
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
                 onPress: async () =>  {
                    await clearInterval(paymentIntervalWING);
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
  
  const PaymentViaWing = async ({ 
    tran_id,
    amount,
    phone,
    schedule,
    userId
   }: any) => {
    //* 1. Creating Auth token (for transaction)
    //* 2. Called encrypt hash
    //* 3. Request to creating transaction goto WING
    //* 4. Open Deep_link (Open App WING)
    //* 5. Creating Auth token (for check verify)
    //* 6. Push back to EPS server
    const currency = 'USD';
    const merchant_id = '4783';
    const merchant_name = 'online.hrdkoreadeep';
    const order_reference_no = tran_id;
    const schema_url = "epstopikapp://main/form";
    const item_name= "Payin";
    const integration_type= "MOBAPP";
    try{
      setLoading({ label: I18n.t('messageRequiringTransaction'), loading: true, type: 'payment' });
      wingAuthToken((res)=>{
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
          wingHash(dataMakeHash,(resHash:unknown)=>{
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
            wingCreatingTransaction(dataDeep,access_token,(resDeep)=>{
              if(Object(resDeep)?.err_code==200 && Object(resDeep)?.data?.redirect_url){
                setLoadingPayment(true);
                console.log(Object(resDeep)?.data?.redirect_url)
                setTimeout(async() => {
                  Linking.openURL(`${Object(resDeep)?.data?.redirect_url}`).catch((e)=>{
                    wingGotoStore();
                  });
                }, 500);
                // request for verify code
                wingAuthToken((authVerify)=>{
                  // if renew has problem will set auth from auth created deep link
                  const token_verify=Object(authVerify)?.data?.access_token!==''?Object(authVerify)?.data?.access_token:access_token
                  paymentIntervalWING = setInterval(() => {
                    wingPaymentStatus(order_reference_no,token_verify,(resPaymentStatus)=>{
                      if( Object(resPaymentStatus)?.data?.transaction_id!==''){
                        clearInterval(paymentIntervalWING);
                        const newDate = moment(new Date()).format('YYYYMMDDHHmmss');
                        pushBackMobileWING({
                          req_time: newDate,
                          tran_id: order_reference_no,
                          amount: amount,
                          device: Platform.OS === 'ios' ? 'ios' : 'android',
                          phone,
                          schedule,
                          userId,
                          payment:'WING'
                        });
                      }
                      // else skip verify
                    })
                  }, 5000);
                  // clear check payment to wing
                  setTimeout(() => {
                    clearInterval(paymentIntervalWING);
                    setLoadingPayment(false);
                    setLoading({loading:false,label:""});
                    if (props?.useResultProfile) props?.useResultProfile({ schedule: isScheduleInfo.id })
                  }, 180000);
                  
                });
              }else{
                setLoading({loading:false,label:""});
                showMessage({
                  message: "សូមអភ័យទោស ការបង់ប្រាក់តាមវីងមានបញ្ហា! ២",
                  type: "danger",
                  backgroundColor: "red",
                  color: "white",
                  icon: "warning",
                  duration: 3000,
                });
              }
            });
          });
        }else{
          setLoading({loading:false,label:""});
          showMessage({
            message: "សូមអភ័យទោស ការបង់ប្រាក់តាមវីងមានបញ្ហា!៣",
            type: "danger",
            backgroundColor: "red",
            color: "white",
            icon: "warning",
            duration: 3000,
          });
        }
      });
  } catch (error) {
    setLoadingPayment(false);
    setLoading({loading:false,label:""});
    showMessage({
      message: "សូមអភ័យទោស ការបង់ប្រាក់តាមវីងមានបញ្ហា! ១",
      type: "danger",
      backgroundColor: "red",
      color: "white",
      icon: "warning",
      duration: 3000,
    });
  }
}
  // Check User Result Profile
  React.useEffect(() => {
    if (resultProfile && resultProfile?.message === 'success') {
      if(paymentInterval)clearInterval(paymentInterval);
      Navigation.reset(navRoutes.CARD);
    }
  }, [resultProfile]);
  // Check user result no profile
  React.useEffect(() => {
    if (errorResultProfile && errorResultProfile?.message === 'empty') {
      setTimeout(() => {
        setLoading({ loading: false, label: '' });
        setRefreshing(false);
      }, 6000);

    }
  }, [errorResultProfile])

  // RE-GET SCHEDULE SUCCESS
  React.useEffect(() => {
    if (refreshing) {
      if (schedules?.message === "success" &&
        Array.isArray(schedules?.data) &&
        schedules?.data?.[0] && refreshing === true) {
        setScheduleInfo({ ...schedules?.data?.[0] });
        setNoSchedule(false);
        checkLogged().then((status: boolean) => {
          if (status) {
            const schedule=schedules?.data?.[0];
            if (props?.useResultProfile) props?.useResultProfile({ schedule: schedules?.data?.[0]?.id })
            if (props?.useJobs) {
              props?.useJobs({
                special: schedule?.special,
                folder: schedule?.folder
              })
            }
            setTimeout(()=>setRefreshing(false),3000);
          }else{
            Alert.alert(
              `${I18n.t('titlePleaseRequiredLogin')}`,
              `${I18n.t('messagePleaseRequiredLogin')}`,
              [
                {
                  text: `${I18n.t('login')}`,
                  onPress: () => NavigationServer.reset(navRoutes.LOGIN),
                },
              ],
              { cancelable: false }
            ); 
          }
        });
      } else {
        setRefreshing(false);
        setNoSchedule(true);
      }
    }
  }, [schedules]);

  // ERROR JOB
  React.useEffect(() => {
    if (errorJobs) {
      if (errorJobs.message === "empty") {
        showMessage({
          message: I18n.t("messageWrongLogin"),
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      } else {
        showMessage({
          message: errorJobs?.errorCode,
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      }
    }
  }, [errorJobs]);

  // Response Verify success
  React.useEffect(() => {
    if (isLoading.loading && verify?.message === "success" && isLoading.type === 'verify') {
      const {
        schedule,
        fullName,
        birthday,
        passport,
        gender,
        job, subJob, phone, device, image, imagePass,
        payment
      } = getValues();
      const input = {
        schedule,
        name: trimEmptyString(fullName),
        birthday: moment(birthday).format('yyyy-MM-DD'),
        passport:trimEmptyString(passport),
        job, subJob, phone:trimEmptyString(phone)
        
        , device, image, imagePass,
        gender,
        payment,
        amount: isScheduleInfo.price
      }
      setLoading({ label: I18n.t('messageRequiringSubmitForm'), loading: true, type: 'submitForm' });
      if (props?.useSubmitForm) props?.useSubmitForm({ ...input });
    }
  }, [verify]);

  // Response Submit Form Success
  React.useEffect(() => {
    (async () => {
      if (isLoading.loading && submitForm?.message === "success" && isLoading?.type === 'submitForm') {
        const {
          fullName,
          phone,
          payment
        } = getValues();
        setValue('tran_id', submitForm?.data);
        if(payment==='ABA' || payment==='aba'){
          setLoading({ label: I18n.t('messageRequiringPayment'), loading: true, type: 'payment' });
          const newDate = moment(new Date()).format('YYYYMMDDHHmmss');
          deepLinkABA({
            req_time: newDate,
              tran_id: submitForm?.data,
              amount: isScheduleInfo.price,
              name: trimEmptyString(fullName),
              phone:trimEmptyString(phone),
          })
        }else if(payment==='BAKONG' || payment==='bakong'){
          setLoading({ label: I18n.t('messageRequiringPayment'), loading: true, type: 'payment' });
          const newDate = moment(new Date()).format('YYYYMMDDHHmmss');
          bakongABA({
            req_time: newDate,
              tran_id: submitForm?.data,
              amount: isScheduleInfo.price,
              name: trimEmptyString(fullName),
              phone:trimEmptyString(phone),
          })
        }else{
          setLoading({ label: I18n.t('messageRequiringPayment'), loading: true, type: 'payment' });
          PaymentViaWing({
              tran_id: submitForm?.data,
              amount: isScheduleInfo.price,
              phone,
              schedules:isScheduleInfo.id,
              userId:isUserInfo.id,
          });
        }
      }
    })()

  }, [submitForm]);

  //Response ERROR verify member
  React.useEffect(() => {
    if (errorVerify && isLoading.loading) {
      // RE-SET Loading to false when has error response
      setTimeout(() => setLoading({ label: '', loading: false }), 2000);
      if (errorVerify.message === "exist-member-in-schedule") {
        showMessage({
          message: `${I18n.t('sorryForMember')} ${getValues('fullName')} ${I18n.t('cannotBuyDuplicateFormOfOneSchedule')}`,
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      } else if (errorVerify.message === "not-exist-member-in-special-schedule") {
        showMessage({
          message: `${I18n.t('sorryForMember')} ${getValues('fullName')} ${I18n.t('cannotBuySpecialForm')}`,
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      } else if (errorVerify.message === "not-exist-schedule") {
        showMessage({
          message: `${I18n.t('cannotSubmitForm')}`,
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      } else if (errorVerify.message === "member-is-blocked") {
        showMessage({
          message: `${I18n.t('cannotSubmitFormBecauseBlocked')}`,
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      }else if (errorVerify.message === "member-is-underage") {
        const momentMinDate = moment(isScheduleInfo.minBirthday);
        const momentMaxDate = moment(isScheduleInfo.maxBirthday);
        showMessage({
          message: `សូមអភ័យទោស​! បេក្ខជនត្រូវមានអាយុចន្លោះពី ${momentMinDate.format("DD-MM-YYYY")} រហូតដល់ ${momentMaxDate.format("DD-MM-YYYY")}`,
          type: "danger",
          backgroundColor: "red",
          color: "white",
          icon: "warning",
          duration: 10000,
        });
      }
      else {
        showMessage({
          message: errorVerify?.errorCode,
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      }
    }
  }, [errorVerify]);

  // Response Submit form Error
  React.useEffect(() => {
    // RE-SET Loading to false when has error response
    setTimeout(() => setLoading({ label: '', loading: false }), 2000);
    if (errorSubmitForm && isLoading.loading) {
      showMessage({
        message: `${I18n.t('cannotSubmitFormError')}`,
        type: "danger",
        backgroundColor: themes.Primary.colorRed100,
        color: "white",
        icon: "warning",
        duration: 7000,
      });
    }
  }, [errorSubmitForm]);

  const Days = () => {
    var rs = [];
    for (var i = 1; i <= isLastDayOfMonth; i++) {
      if (i <= 9) {
        rs.push({ label: `0` + i.toString(), value: `${i}` });
      } else {
        rs.push({ label: i.toString(), value: `${i}` });
      }
    }
    return rs;
  };
  const Months = () => {
    return ArrayMonths.map((month: string, i: number) => ({
      value: `${i + 1}`,
      label: `${month}`,
    }));
  };
  const Years = () => {
    const YDateStart = moment(isScheduleInfo.minBirthday).format('YYYY');
    const YDateEnd = moment(isScheduleInfo.maxBirthday).format('YYYY');
    let years = []
    if (YDateStart <= YDateEnd) {
      for (let i = Number(YDateStart); i <= Number(YDateEnd); i++) {
        years.push(
          {
            value: `${i}`,
            label: `${Number(i)}`,
          })
      }
    }
    return years;
  }
  const handleJobs = (jobs: iJob[]) => {
    let result: iLabelJob[] = [];
    if (jobs?.length > 0) {
      jobs.map((job) => {
        if (job.isMain === 1) {
          result.push(
            { label: job.name, value: `${job.id}` }
          )
        }
      })
    }
    return result;
  }
  const handleSubJob = (jobs: iJob[], mainId: number) => {
    let result: iLabelJob[] = [];
    if (jobs?.length > 0) {
      jobs.map((job) => {
        if (job.mainId === mainId) {
          result.push(
            { label: job.name, value: `${job.id}` }
          )
        }
      })
    }
    return result;
  }
  const handleFindJob = (jobs: iJob[], id: number) => {
    let result = '';
    if (jobs?.length > 0) {
      result = jobs.find((job) => job.id === Number(id))?.name || ''
    }
    return result;
  }
  const handleRequest = async () => {
    if (props?.useSchedules) await props?.useSchedules(isScheduleInfo.id);
  };
  const onRefresh = () => {
    setRefreshing(true);
    handleRequest();
  };
  const onSubmit = (data: any) => {
    var birthday = data?.day + "-" + data?.month + "-" + data?.year;
    const formatted = moment(birthday, "DD-MM-YYYY");
    const momentMinDate = moment(isScheduleInfo.minBirthday);
    const momentMaxDate = moment(isScheduleInfo.maxBirthday);
    if (formatted.isValid() ) {
      if(isValidPhoneNumber(data?.phone)){
        if (data?.condition1 && data?.condition2 && data?.condition3 && data?.fullName !== ''
          && data?.gender !== '' && (data?.job && data?.subJob) > 0 && data?.payment !== '' &&
          data?.passport !== '' && data?.phone !== '' && data?.image && data?.imagePass
        ) {
          const isBetween = formatted.isBetween(momentMinDate, momentMaxDate, null, '[]'); // '[]' includes boundaries
            if(isBetween){
              setPreview(true);
              setValue('birthday', formatted);
              setValue('jobTitle', handleFindJob(Object(jobs)?.data, data?.job));
              setValue('jobSubTitle', handleFindJob(Object(jobs)?.data, data?.subJob));
              setValue('schedule', Number(isScheduleInfo.id));
            }else{
              showMessage({
                message: `សូមអភ័យទោស​! បេក្ខជនត្រូវមានអាយុចន្លោះពី ${momentMinDate.format("DD-MM-YYYY")} រហូតដល់ ${momentMaxDate.format("DD-MM-YYYY")}`,
                type: "danger",
                backgroundColor: "red",
                color: "white",
                icon: "warning",
                duration: 10000,
              });
          }
      }else{
       // has null
        showMessage({
          message: I18n.t("verifyForm"),
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      }
      } else {
         // invalid phone
         showMessage({
          message: I18n.t("messageRequiredPhone"),
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
       
      }
    } else {
      showMessage({
        message: I18n.t("verifyBirthday"),
        type: "danger",
        backgroundColor: themes.Primary.colorRed100,
        color: "white",
        icon: "warning",
        duration: 7000,
      });
    }

  };
  const handleAlertEmptyForm = () => {
    if (Object.keys(errors).length > 0) {
      showMessage({
        message: I18n.t("verifyForm"),
        type: "danger",
        backgroundColor: themes.Primary.colorRed100,
        color: "white",
        icon: "warning",
        duration: 7000,
      });
      return;
    }
  }
  const handleVerify = () => {
    setLoading({ label: I18n.t('messageRequiringVerify'), type: "verify", loading: true });
    const {
      schedule,
      fullName,
      birthday,
      passport
    } = getValues();
    const input = {
      exam: schedule,
      name: trimEmptyString(fullName),
      birthday: moment(birthday).format('yyyy-MM-DD'),
      passport:trimEmptyString(passport)
    }
    props?.useVerify({ ...input });
    setTimeout(() => setPreview(false), 100);
  }
  const supperClearVerify = () => {
    if (props?.useResultProfile) props?.useResultProfile({ schedule: isScheduleInfo.id })
    setLoading({'loading':false,label:''});
    setLoadingPayment(false);
    clearInterval(paymentIntervalWING);
    clearInterval(paymentInterval);
  }
  return (
    <React.Fragment>
      <Layout
        loading={loadingHome || refreshing || isLoading.loading}
        typeScreenSchedule
        centerTitle={isScheduleInfo?.name}
        handleLeftBack={() => Navigation.goBack()}
        labelLoading={isLoading.label}
      >
        {/* <TouchableOpacity onPress={()=>sendMessagePushBackError('hello')}>
          <Text>TELEGRAM</Text>
        </TouchableOpacity> */}
        {
        refreshing || loadingHome || isLoading.loading?null:
        <React.Fragment>
        {isScheduleInfo.open>0 && !isNoSchedule?
          (<ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.bodyScroll}>
            <TouchableOpacity
              onPress={() => {
                setValue('fullName', 'BIENSOTHEARITH');
                setValue('gender', 'Male');
                setValue('day', '17');
                setValue('month', '2');
                setValue('year', '2000');
                setValue('condition1', true);
                setValue('condition2', true);
                setValue('condition3', true);
                setValue('phone', '070594606');
                setValue('passport', '070594606');
                setValue('job', '2');
                setValue('subJob', '4');
              }
              }>
              <Text style={{color:'red'}}>AA</Text>
            </TouchableOpacity> 
            <TextInput
              inputStyle={{
                fontSize: 16,
                fontFamily: themes.FontFamily.Hanuman,
                height: 45,
              }}
              englishLetter
              keyboardType="default"
              style={styles.input}
              name="fullName"
              rules={{
                required: true,
              }}
              errors={errors}
              control={control}
              placeholder={I18n.t("fullName")}
            />
            <PickerSelect
              style={{
                marginTop: 10,

              }}
              name="gender"
              control={control}
              errors={errors}
              data={[
                { label: I18n.t("female"), value: "Female" },
                { label: I18n.t("male"), value: "Male" },
              ]}
              rules={{
                required: true,
              }}
              title={I18n.t("gender")}
            />
            <View style={{ flexDirection: "row", flex: 1 }}>
              <PickerSelect
                style={{
                  marginTop: 10,
                  flex: 0.25,
                  marginEnd: 5,
                }}
                name="day"
                control={control}
                errors={errors}
                data={Days()}
                rules={{
                  required: true,
                }}
                title={I18n.t("day")}
              />
              <PickerSelect
                style={{
                  marginTop: 10,
                  flex: 0.35,
                  marginEnd: 5,
                }}
                name="month"
                control={control}
                errors={errors}
                data={Months()}
                rules={{
                  required: true,
                }}
                title={I18n.t("month")}
              />

              <PickerSelect
                style={{
                  marginTop: 10,
                  flex: 0.4,
                }}
                name="year"
                control={control}
                errors={errors}
                data={Years()}
                rules={{
                  required: true,
                }}
                title={I18n.t("year")}
              />
            </View>
            <PickerSelect
              onChange={(value) => {
                setJobSelected(Number(value));
                setValue('job', Number(value));
                setValue('subJob', '');
              }}
              style={{
                marginTop: 10,
                flex: 0.2,
              }}
              name="job"
              control={control}
              errors={errors}
              data={handleJobs(Object(jobs)?.data)}
              rules={{
                required: true,
              }}
              title={I18n.t("selectJob")}
            />
            <PickerSelect
              style={{
                marginTop: 10,
                flex: 0.2,
              }}
              name="subJob"
              control={control}
              errors={errors}
              data={handleSubJob(Object(jobs)?.data, Number(isJobSelected))}
              rules={{
                required: true,
              }}
              title={I18n.t("selectSubJob")}
            />
            <TextInput
              phoneNumber
              keyboardType="phone-pad"
              name="phone"
              rules={{
                required: true,
              }}
              style={{ marginTop: 10 }}
              errors={errors}
              control={control}
              helperText={Object(errors)?.phone?.message}
              placeholder={I18n.t("phoneForm")}
            />
            <TextInput
              name="passport"
              rules={{
                required: true,
              }}
              style={{ marginTop: 10 }}
              errors={errors}
              control={control}
              helperText={Object(errors)?.passport?.message}
              placeholder={I18n.t("idCardOrPassport")}
            />
            <CheckBox
              rules={{
                required: true,
              }}
              errors={errors}
              style={{ marginTop: 30 }}
              name="condition1"
              title={I18n.t("conditionForm1")}
              control={control}
            />
            <CheckBox
              style={{ marginTop: 5 }}
              name="condition2"
              title={I18n.t("conditionForm2")}
              control={control}
            />
            <CheckBox
              style={{ marginTop: 5 }}
              name="condition3"
              title={I18n.t("conditionForm3")}
              control={control}
            />

            <>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                }}
              >
                <Text style={{ fontSize: 16, color: themes.Primary.colorRed }}>*</Text>
                <Text style={{ fontSize: 16, color: themes.Primary.colorTextBlack }}>{I18n.t('userPhoto')}</Text>
              </View>
              <PickerImage
                type="photo"
                control={control}
                name="image"
                onChange={(value) => {
                  setValue("image", value);
                }}
              />
            </>
            <>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                }}
              >
                <Text style={{ fontSize: 16, color: themes.Primary.colorRed }}>*</Text>
                <Text style={{ fontSize: 16, color: themes.Primary.colorTextBlack }}>
                  {I18n.t('userCard')}
                </Text>
              </View>
              <PickerImage
                control={control}
                name="imagePass"
                type="IdCard"
                onChange={(value) => {
                  setValue("imagePass", value);
                }}
              />
            </>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                marginBottom: 20,
                width: "95%",
              }}
            >
              <Text style={{ fontSize: 16, color: themes.Primary.colorRed, marginEnd: 5 }}>*</Text>
              <Text style={{ fontSize: 14, color: themes.Primary.colorGrey }}>
                {I18n.t('labelRequiredPayment')}
                <Text style={{ fontSize: 14, color: themes.Primary.colorTextBlack, fontWeight: "bold" }}>
                  {`  ` + `${Number(isScheduleInfo?.price) > 0 ? Number(isScheduleInfo.price).toFixed(2) : Number(28).toFixed(2)}` + `  `}
                </Text>
                {I18n.t('labelRequiredPayment2')}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: themes.Primary.colorTextBlack,
                fontFamily: themes.FontFamily.Hanuman,
              }}
            >
              {I18n.t('choicePayment')}
            </Text>
            <View style={{ marginBottom: 50 }}>
              <View>
                {
                  isScheduleInfo.aba === 1 ?
                    <TouchableOpacity
                      style={styles.payment_btn}
                      onPressIn={() => {
                        handleAlertEmptyForm();
                        setValue('payment', 'ABA');
                      }}
                      onPress={
                        handleSubmit(onSubmit)
                      }

                    >
                      <Image
                        source={ABA}
                        style={{
                          height: 42,
                          width: Platform.OS === 'ios' ? 80 : 80,
                          resizeMode: "contain",
                        }}
                      />
                      <View
                        style={{
                          marginTop: Platform.OS === "ios" ? 3 : 0,
                        }}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: themes.Primary.colorTextBlack }}>
                          ABA PAY
                        </Text>
                        <Text style={{ fontSize: Platform.OS === 'ios' ? 11 : 12, color: "gray" }}>
                          ចុច ដើម្បីទូទាត់តាម ABA Mobile
                        </Text>
                      </View>
                    </TouchableOpacity>
                    : null
                }
                {
                  isScheduleInfo.bakong === 1 ?
                    <TouchableOpacity
                    onPressIn={() => {
                      handleAlertEmptyForm();
                      setValue('payment', 'BAKONG');
                    }}
                    onPress={
                      handleSubmit(onSubmit)
                    }
                      style={styles.payment_btn}
                    >
                      <Image
                        source={KHQR}
                        style={{
                          height: 40,
                          width: Platform.OS === 'ios' ? 80 : 80,
                          resizeMode: "contain",
                        }}
                      />
                      <View>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: themes.Primary.colorTextBlack }}>KHQR</Text>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: Platform.OS === 'ios' ? 11 : 11,
                            width: "100%",
                            fontWeight: "100",
                            color: themes.Primary.colorGrey
                          }}
                        >
                          ចុច ដើម្បីទូទាត់ជាមួយកម្មវិធីធនាគារដែលជាសមាជិក
                        </Text>
                      </View>
                    </TouchableOpacity> : null
                }
                {
                  isScheduleInfo?.wing === 1 ?
                    <TouchableOpacity
                      onPressIn={() => {
                        handleAlertEmptyForm();
                        setValue('payment', 'WING');
                      }}
                      onPress={
                        handleSubmit(onSubmit)
                      }
                      style={[styles.payment_btn, { paddingVertical: 5 }]}
                    >
                      <Image
                        source={WingBank}
                        style={{
                          height: 50,
                          width: Platform.OS === 'ios' ? 80 : 80,
                          resizeMode: "contain",
                        }}
                      />
                      <View style={{ marginLeft: 0 }}>
                        <Text style={{
                          fontSize: 18, fontWeight: "bold",
                          color: themes.Primary.colorTextBlack
                        }}>
                          Wing Bank
                        </Text>
                        <Text style={{
                          fontSize: Platform.OS === 'ios' ? 11 : 12,
                          color: themes.Primary.colorGrey
                        }}>
                          ចុច ដើម្បីទូទាត់តាម Wing Bank
                        </Text>
                      </View>
                    </TouchableOpacity> : null
                }

              </View>
            </View>
          </ScrollView>) :
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={[styles.bodyScroll,{padding:0, paddingHorizontal:0}]}>
          <NoSchedule />
          </ScrollView>
        }
        </React.Fragment>
        }
        <PreviewForm
          data={getValues()}
          visible={isPreview}
          handleClose={() => setPreview(false)}
          handleSave={() =>{
            setLoading({ label: I18n.t('messageRequiringVerify'), type: "verify", loading: true });
            setTimeout(()=>handleVerify(),500);
          }
          }
        />
       
      </Layout>
      {isLoadingPayment?
      <LoadingPayment
      cancelVerifySuper={()=>
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
                await supperClearVerify();
              },
            },
          ],
          { cancelable: false }
        )
        }
        />  :null
      }
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height,
    marginTop: -180,
    alignContent: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    // flex: Platform.OS === "ios" ? 0.65 : 0.45,
    justifyContent: "center",
    flex:1,
    // alignContent: "flex-end",
    // marginBottom: -50,
  },
  bodyScroll: {
    paddingVertical: 30,
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
    flex: .8,
    height: "100%",
    marginEnd: 10,
    marginStart: 10,
    resizeMode: "contain",
  },
  view_lr: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "center",
  },
  view_lb: {
    flexDirection: "row",
  },
  text_lb: {
    fontSize: Platform.OS === "ios" ? 16 : 18,
    textAlign: "center",
  },
  butImage46: {
    alignSelf: "center",
    padding: 0,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  butImage46Text: {
    fontSize: 18,
    textAlign: "center",
  },
  payment_btn: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    shadowColor: themes.Primary.colorGrey,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 2,
    backgroundColor: themes.Primary.background,
    height:60,
    paddingLeft:5
  },
});
