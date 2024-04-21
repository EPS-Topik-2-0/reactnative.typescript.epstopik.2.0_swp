import { call, put, takeLatest, SagaReturnType } from "redux-saga/effects";
import { LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS, 
  LOGOUT_FAILURE,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS
  } from "./index";
import { navRoutes } from "../../navigation/navRoutes";
import NavgationServiece from "../../services/navgationService";
import { axios,axiosSWP } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keystores } from "../../constants";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../app";
function* userWorker(payload: unknown) {
  try {
    const data: SagaReturnType<any> = yield call(
      axios.post,
      "/login",
      Object(payload)?.payload
    );
    yield (axios.defaults.headers.common = {
      Authorization: `Bearer ${Object(data)?.data?.token}`
    });
    yield (axiosSWP.defaults.headers.common = {
      Authorization: `Bearer ${Object(data)?.data?.token}`
    });
    yield call(AsyncStorage.setItem, keystores.user, JSON.stringify(data));
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        login: Object(data)?.data,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: LOGIN_FAILURE,
      payload: { errorLogin: message },
    });
  }
}
function* logoutWorker() {
  try {
    yield AsyncStorage.removeItem(keystores.user);
    NavgationServiece.reset(navRoutes.MAIN);
    yield put({
      type: LOGOUT_SUCCESS,
      payload: {
        login:false,
        logout:true
      },
    });
  } catch (e: any) {
    yield put({
      type: LOGOUT_FAILURE,
      payload: {login:false},
    });
  }
}
function* userSingUpWorker(payload: unknown) {
  try {
    const data: SagaReturnType<any> = yield call(
      axios.post,
      "/sign-up",
      Object(payload)?.payload
    );
    yield (axios.defaults.headers.common = {
      Authorization: `Bearer ${Object(data)?.data?.token}`
    });
    yield (axiosSWP.defaults.headers.common = {
      Authorization: `Bearer ${Object(data)?.data?.token}`
    });
    yield call(AsyncStorage.setItem, keystores.user, JSON.stringify(data));
    yield put({
      type: SIGNUP_SUCCESS,
      payload: {
        signUp: Object(data)?.data,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: SIGNUP_FAILURE,
      payload: { errorSignUp: message },
    });
  }
}
export function* saga() {
  yield takeLatest(LOGIN_REQUEST, userWorker);
  yield takeLatest(LOGOUT_REQUEST, logoutWorker);
  yield takeLatest(SIGNUP_REQUEST, userSingUpWorker);
}
