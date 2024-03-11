import { call, put, takeLatest, SagaReturnType } from "redux-saga/effects";
import { 
  SUBMIT_FORM_FAILURE,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  VERIFY_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,

  PAYMENT_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,

  VERIFY_PAYMENT_SUCCESS,
  VERIFY_PAYMENT_FAILURE,
  VERIFY_PAYMENT_REQUEST,
  PUSH_BACK_MOBILE_REQUEST,

  RESULT_PROFILE_FAILURE,
  RESULT_PROFILE_REQUEST,
  RESULT_PROFILE_SUCCESS,
  PUSH_BACK_MOBILE_FAILURE,
  PUSH_BACK_MOBILE_SUCCESS

  } from "./index";
import { axios,
} from "../../api";
import CryptoJS from 'crypto-js';
import { ABA_PAYWAY_KEY,
  ABA_PAYWAY_MERCHANT_ID,
  ABA_API_PURCHASE,
  REFERER,
  HASH,
  ABA_PAYWAY_CHECK_TRANSACTION
   } from '@env';

import {Platform} from 'react-native';
import orgAxios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keystores } from "../../constants";

function* submitFormWorker(payload: any) {
  try {
    const formData = new FormData();
    formData.append('name', Object(payload)?.payload?.name);
    formData.append('gender', Object(payload)?.payload?.gender);
    formData.append('birthday', Object(payload)?.payload?.birthday);
    formData.append('passport', Object(payload)?.payload?.passport);
    formData.append('job', Object(payload)?.payload?.job);
    formData.append('subJob', Object(payload)?.payload?.subJob);
    formData.append('phone', Object(payload)?.payload?.phone);
    formData.append('device',Platform.OS==='ios'?'ios':'android');
    formData.append('schedule', Object(payload)?.payload?.schedule);
    formData.append('payment', Object(payload)?.payload?.payment);
    formData.append('amount', Object(payload)?.payload?.amount);

    formData.append('image', {
      uri: payload?.payload?.['image']?.path,
      type: payload?.payload?.['image']?.mime,
      name: payload?.payload?.['image']?.path.split('/').pop(),
    });
    formData.append('imagePass', {
      uri: payload?.payload?.['imagePass']?.path,
      type: payload?.payload?.['imagePass']?.mime,
      name: payload?.payload?.['imagePass']?.path.split('/').pop(),
    });
    const response:SagaReturnType<any> = yield axios.post('/submit-form', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put({
      type: SUBMIT_FORM_SUCCESS,
      payload: {
        submitForm: Object(response)?.data,
      },
    });
  } catch (error) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(error));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: SUBMIT_FORM_FAILURE,
      payload: { errorSubmitForm: message },
    });
  }
}

function* verifyWorker(payload:unknown) {
  try {
    const verify: SagaReturnType<any> = yield call(axios.post, "/verify-member",Object(payload)?.payload);
    yield put({
      type: VERIFY_SUCCESS,
      payload: {
        verify: Object(verify)?.data,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: VERIFY_FAILURE,
      payload: { errorVerify: message },
    });
  }
}

function* payment(payload: any) {
  try {
    const {
      req_time,
      tran_id,
      amount,
      name,
      phone,
    }=payload?.payload;
    const dataToHash = Object(payload)?.payload?.req_time + ABA_PAYWAY_MERCHANT_ID + tran_id+amount+name+phone+'abapay_deeplink';
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
  
    const response:SagaReturnType<any> = yield call(orgAxios.post,ABA_API_PURCHASE, data, {
       headers: {
             "Content-Type": `multipart/form-data; boundary=${Object(data)?._boundary}`,
             Referer: REFERER,
       },
    });
    yield put({
      type: PAYMENT_SUCCESS,
      payload: {
        payment: response,
      },
    });
  } catch (error) {
    console.log(error)
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(error));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: PAYMENT_FAILURE,
      payload: { errorPayment: message },
    });
  }
}


function* verifyPayment(payload: any) {
  try {
    const {
      req_time,
      tran_id,
    }=payload?.payload;
   const dataToHash = req_time + ABA_PAYWAY_MERCHANT_ID + tran_id;
 
   // Convert the key to WordArray (required by CryptoJS)
   const keyWordArray = CryptoJS.enc.Utf8.parse(ABA_PAYWAY_KEY);
 
   // Calculate HMAC-SHA512 hash
   const hmacSha512 = CryptoJS.HmacSHA512(dataToHash, keyWordArray);
 
   // Convert the hash to a Base64-encoded string
   const base64EncodedHash = CryptoJS.enc.Base64.stringify(hmacSha512);
   const data = new FormData();
   data.append("hash", base64EncodedHash);
   data.append("tran_id", tran_id);
   data.append("req_time", req_time);
   data.append("merchant_id", ABA_PAYWAY_MERCHANT_ID);

   const response:SagaReturnType<any> = yield orgAxios.post(ABA_PAYWAY_CHECK_TRANSACTION, data, {
       headers: {
             "Content-Type": `multipart/form-data; boundary=${Object(data)?._boundary}`,
             Referer: REFERER,
       },
 });
    yield put({
      type: VERIFY_PAYMENT_SUCCESS,
      payload: {
        verifyPayment: Object(response)?.data,
      },
    });
  } catch (error) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(error));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    console.log('ERROR ABA',error)
    yield put({
      type: VERIFY_PAYMENT_FAILURE,
      payload: { errorVerifyPayment: message },
    });
  }
}

function* pushBackMobile(payload: any) {
  try {
    const {
      req_time,
      tran_id,
      amount,
      device,
      phone,
      schedule,
      userId,
      payment
    }=payload?.payload;
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
   const response:SagaReturnType<any> = yield axios.post(`push-back-mobile`, data, {
       headers: {
        Referer: REFERER
       },
 });
  console.log('hash',base64EncodedHash)
    yield put({
      type: PUSH_BACK_MOBILE_SUCCESS,
      payload: {
        pushBackMobile: Object(response)?.data,
      },
    });
  } catch (error) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(error));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: PUSH_BACK_MOBILE_FAILURE,
      payload: { errorPushBackMobile: message },
    });
  }
}

function* resultProfile(payload: any) {
  try {
    const response: SagaReturnType<any> = yield call(
      axios.get,
      "result-form/" + payload?.payload?.schedule + "/" + new Date().getTime()
    );
    yield call(AsyncStorage.setItem, keystores.resultProfile, JSON.stringify(Object(response)?.data));
    yield put({
      type: RESULT_PROFILE_SUCCESS,
      payload: {
        resultProfile:Object(response)?.data,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: RESULT_PROFILE_FAILURE,
      payload: { errorResultProfile: message },
    });
  }
}
export function* saga() {
  yield takeLatest(SUBMIT_FORM_REQUEST, submitFormWorker);
  yield takeLatest(VERIFY_REQUEST, verifyWorker);
  yield takeLatest(PAYMENT_REQUEST, payment);
  yield takeLatest(PUSH_BACK_MOBILE_REQUEST, pushBackMobile);
  yield takeLatest(RESULT_PROFILE_REQUEST, resultProfile);
  
}
