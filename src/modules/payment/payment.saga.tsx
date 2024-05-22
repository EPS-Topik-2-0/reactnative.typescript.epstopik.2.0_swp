import { call, put, takeLatest, SagaReturnType } from "redux-saga/effects";
import {
  DEEP_LINK_FAILURE,
  DEEP_LINK_REQUEST,
  DEEP_LINK_SUCCESS
} from "./index";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { ABA_PAYWAY_KEY,
  ABA_PAYWAY_MERCHANT_ID,
  ABA_API_PURCHASE,
  REFERER,
  ABA_PURCHASE } from '@env';

export const BankAxios= axios.create({
  baseURL: ABA_PURCHASE,
});
function* getDeepLink(payload:any) {
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
    axios.post(ABA_API_PURCHASE, data, {
      headers: {
        Referer: REFERER,
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    })
      .then(response => {
        console.log('---...response.data',...response.data)
      })
      .catch(error => {
        console.log('error',error)
      });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: DEEP_LINK_FAILURE,
      payload: { errorDeepLink: message },
    });
  }
}

export function* saga() {
  yield takeLatest(DEEP_LINK_REQUEST, getDeepLink);
}
