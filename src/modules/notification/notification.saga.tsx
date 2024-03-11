import { call, put, takeLatest, SagaReturnType } from "redux-saga/effects";
import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_FAILURE,
  NOTIFICATION_SUCCESS,
} from "./index";
import { containsKeyLocalStore, getLocalStore } from "../../hook/localStore";
import { navRoutes } from "../../navigation/navRoutes";
import NavgationServiece from "../../services/navgationService";
import Hook from "../../hook";
import { axios } from "../../api";
import { error, success } from "@redux-requests/core";

function* notificationWorker() {
  try {
    const schedules: SagaReturnType<any> = yield call(
      axios.get,
      "/notifications"
    );
    yield put({
      type: NOTIFICATION_SUCCESS,
      payload: {
        notifications: Object(schedules)?.data,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: NOTIFICATION_FAILURE,
      payload: { errorSchedules: message },
    });
  }
}
export function* saga() {
  yield takeLatest(NOTIFICATION_REQUEST, notificationWorker);
}
