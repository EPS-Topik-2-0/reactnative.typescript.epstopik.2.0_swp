import { localKeys } from "./localKey";
import { API_HOST,ABA_CRYPTO,ABA_PURCHASE } from '@env';

import axiosDefault from "axios";

const RootValriable = { localKeys };

export const axios = axiosDefault.create({
  baseURL: "https://epstopikapi.mtosb.gov.kh/V2",
});
export const cryptoAxios= axiosDefault.create({
  baseURL: ABA_CRYPTO,
});

export const BankAxios= axiosDefault.create({
  baseURL: ABA_PURCHASE,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.config.url !== `${API_HOST}/user/logout`
      ) {
        // store.dispatch(userLogout());
      }
      return Promise.reject(error.response);
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export default RootValriable;
