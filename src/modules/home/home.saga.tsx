import { call, put, takeLatest, SagaReturnType } from "redux-saga/effects";
import { Platform } from "react-native";
import {
  SIDE_INFO_REQUEST,
  SIDE_INFO_FAILURE,
  SIDE_INFO_SUCCESS,
  SCHEDULES_REQUEST,
  SCHEDULES_FAILURE,
  SCHEDULES_SUCCESS,
  JOBS_SUCCESS,
  JOBS_FAILURE,
  JOBS_REQUEST,
} from "./index";import { axios } from "../../api";

function* getSideInfoWorker() {
  try {
    const sideInfo: SagaReturnType<any> = yield call(
      axios.get,
      "/side-info/" + Platform.OS + "/" + new Date().getTime()
    );
    yield put({
      type: SIDE_INFO_SUCCESS,
      payload: {
        sideInfo,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: SIDE_INFO_FAILURE,
      payload: { errorSideInfo: message },
    });
  }
}

function* schedulesWorker(payload:unknown) {
  try {
    const schedules: SagaReturnType<any> = yield call(axios.get, "/schedules"+`/${Object(payload)?.payload>0?Object(payload)?.payload:0}`,{timeout:5000});
    yield put({
      type: SCHEDULES_SUCCESS,
      payload: {
        schedules: Object(schedules)?.data,
      },
    });
  } catch (e: any) {
    yield put({
      type: SCHEDULES_SUCCESS,
      payload: { schedules:[] },
    });
  }
}


function* getJobsWorker(payload:unknown) {
  try {
    const jobs: SagaReturnType<any> = yield call(
      axios.get,
      "/section-job/" + Object(payload)?.payload?.special+"/"+Object(payload)?.payload?.folder
    );
    yield put({
      type: JOBS_SUCCESS,
      payload: {
        jobs:Object(jobs)?.data,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: JOBS_FAILURE,
      payload: { errorJobs: message },
    });
  }
}

export function* saga() {
  yield takeLatest(SIDE_INFO_REQUEST, getSideInfoWorker);
  yield takeLatest(SCHEDULES_REQUEST, schedulesWorker);
  yield takeLatest(JOBS_REQUEST, getJobsWorker);
}
