import { localKeys } from "./localKey";
import axiosDefault from "axios";
import {
  ABA_CRYPTO_URL,
  ABA_PURCHASE_URL,
  API_URL,
  API_URL_SWP
} from './config';

const RootValriable = { localKeys };

export const axios = axiosDefault.create({
  baseURL: API_URL,
});

export const axiosSWP = axiosDefault.create({
  baseURL: API_URL_SWP,
});

export const cryptoAxios= axiosDefault.create({
  baseURL: ABA_CRYPTO_URL,
});

export const BankAxios= axiosDefault.create({
  baseURL: ABA_PURCHASE_URL,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.config.url !== `${API_URL}/user/logout`
      ) {
        // store.dispatch(userLogout());
      }
      return Promise.reject(error.response);
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

axiosSWP.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.config.url !== `${API_URL_SWP}/user/logout`
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
