import {put, takeLatest, SagaReturnType } from "redux-saga/effects";
import { APP_INIT } from "./index";
import { navRoutes } from "../../navigation/navRoutes";
import NavgationServiece from "../../services/navgationService";
import { axios,axiosSWP } from "../../api";
import { error } from "@redux-requests/core";
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
        yield (axiosSWP.defaults.headers.common = {
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
export function* appSaga() {
  yield takeLatest(APP_INIT, startupWorker);
}
