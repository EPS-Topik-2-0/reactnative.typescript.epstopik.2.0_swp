import { call, put, takeLatest, SagaReturnType } from "redux-saga/effects";
import { SET_THEMING, SET_LANGUAGE } from "./app.reducers";
import { Platform } from "react-native";
import { APP_INIT } from "./index";
import { containsKeyLocalStore, getLocalStore } from "../../hook/localStore";
import { navRoutes } from "../../navigation/navRoutes";
import NavgationServiece from "../../services/navgationService";
import Hook from "../../hook";
import { axios } from "../../api";
import { error, success } from "@redux-requests/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keystores } from "../../constants";

function* startupWorker() {
  try {
    const userInfo:SagaReturnType<any>= yield AsyncStorage.getItem(keystores.user);
    if (userInfo && typeof userInfo==='string') {
      const userInfoParsed:SagaReturnType<any> = yield JSON.parse(userInfo);
      if (Object(userInfoParsed)?.data && Object(userInfoParsed)?.data?.token !== "") {
        yield (axios.defaults.headers.common = {
          authorization: `Bearer ${Object(userInfoParsed)?.data?.token}`
        });
        }
        }
        yield NavgationServiece.reset(navRoutes.MAIN);
    } 

  catch (e: any) {
    yield put({
      type: error(APP_INIT),
      payload: { sideInfo: e },
    });
  }
}

function* setTheme({ payload }: any) {
  try {
    Hook.setThemeLocal(payload.theme);
    if (payload.nav) {
      yield NavgationServiece.reset(payload.nav);
      yield NavgationServiece.navigate(payload.nav);
    }
  } catch (e: any) {
    console.log(e);
  }
}

function* setLanguage({ payload }: any) {
  try {
    Hook.setLanguageLocal(payload.language);
    if (payload.nav) {
      yield NavgationServiece.reset(payload.nav);
      yield NavgationServiece.navigate(payload.nav);
    }
  } catch (e: any) {
    console.log(e);
  }
}

export function* appSaga() {
  yield takeLatest(APP_INIT, startupWorker);
  // yield takeLatest(SET_THEMING, setTheme);
  // yield takeLatest(SET_LANGUAGE, setLanguage);
}
