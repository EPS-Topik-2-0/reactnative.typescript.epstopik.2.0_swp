import { call, put, takeLatest, SagaReturnType } from "redux-saga/effects";
import {
  SCHEDULES_SEASONAL_REQUEST,
  SCHEDULES_SEASONAL_SUCCESS,
  RESULT_PROFILE_SEASONAL_FAILURE,
  RESULT_PROFILE_SEASONAL_REQUEST,
  RESULT_PROFILE_SEASONAL_SUCCESS,
  JOBS_SEASONAL_FAILURE,
  JOBS_SEASONAL_REQUEST,
  JOBS_SEASONAL_SUCCESS,
  SCHEDULES_SEASONAL_FAILURE,
  VERIFY_MEMBER_SEASONAL_SUCCESS,
  VERIFY_MEMBER_SEASONAL_FAILURE,
  VERIFY_MEMBER_SEASONAL_REQUEST,
  SUBMIT_FORM_SEASONAL_FAILURE,
  SUBMIT_FORM_SEASONAL_REQUEST,
  SUBMIT_FORM_SEASONAL_SUCCESS
} from "./index";
import { axiosSWP } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keystores } from "../../constants";
import {Platform} from 'react-native';

function* schedulesSeasonalWorker(payload:unknown) {
  try {
    const schedulesSeasonal: SagaReturnType<any> = yield call(axiosSWP.get, "/schedules-seasonal"+`/${Object(payload)?.payload>0?Object(payload)?.payload:0}`,{timeout:5000});
    yield put({
      type: SCHEDULES_SEASONAL_SUCCESS,
      payload: {
        schedulesSeasonal: Object(schedulesSeasonal)?.data,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: SCHEDULES_SEASONAL_FAILURE,
      payload: { schedulesSeasonal:message },
    });
  }
}


function* resultProfileSeasonal(payload: any) {
  try {
    const response: SagaReturnType<any> = yield call(
      axiosSWP.get,
      "result-form-seasonal/" + payload?.payload?.schedule + "/" + new Date().getTime()
    );
    yield call(AsyncStorage.setItem, keystores.resultProfileSeasonal, JSON.stringify(Object(response)?.data));
    yield put({
      type: RESULT_PROFILE_SEASONAL_SUCCESS,
      payload: {
        resultProfileSeasonal:Object(response)?.data,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
      yield put({
      type: RESULT_PROFILE_SEASONAL_FAILURE,
      payload: { resultProfileSeasonal: message },
    });
  }
}
function* getJobsSeasonalWorker(payload:unknown) {
  try {
    const jobsSeasonal: SagaReturnType<any> = yield call(
      axiosSWP.get,
      "/section-job-seasonal/"+Object(payload)?.payload?.folder
    );
    yield put({
      type: JOBS_SEASONAL_SUCCESS,
      payload: {
        jobsSeasonal:Object(jobsSeasonal)?.data,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: JOBS_SEASONAL_FAILURE,
      payload: { errorJobsSeasonal: message },
    });
  }
}
function* verifyMemberSeasonalWorker(payload:unknown) {
  try {
    const verifyMemberSeasonal: SagaReturnType<any> = yield call(axiosSWP.post, "/verify-member-seasonal",Object(payload)?.payload);
    yield put({
      type: VERIFY_MEMBER_SEASONAL_SUCCESS,
      payload: {
        verifyMemberSeasonal: Object(verifyMemberSeasonal)?.data,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: VERIFY_MEMBER_SEASONAL_FAILURE,
      payload: { verifyMemberSeasonal: message },
    });
  }
}

function* submitFormSeasonalWorker(payload: any) {
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
    formData.append('place', Object(payload)?.payload?.place);

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
    const responseSubmit:SagaReturnType<any> = yield call(axiosSWP.post,"/submit-form-seasonal",formData,{headers:{
      'Content-Type': 'multipart/form-data',
    }});
    yield put({
      type: SUBMIT_FORM_SEASONAL_SUCCESS,
      payload: {
        submitFormSeasonal: Object(responseSubmit)?.data,
      },
    });
  } catch (error) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(error));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: SUBMIT_FORM_SEASONAL_FAILURE,
      payload: { submitFormSeasonal: message },
    });
  }
}

export function* saga() {
  yield takeLatest(SCHEDULES_SEASONAL_REQUEST, schedulesSeasonalWorker);
  yield takeLatest(RESULT_PROFILE_SEASONAL_REQUEST, resultProfileSeasonal);
  yield takeLatest(JOBS_SEASONAL_REQUEST, getJobsSeasonalWorker);
  yield takeLatest(VERIFY_MEMBER_SEASONAL_REQUEST, verifyMemberSeasonalWorker);
  yield takeLatest(SUBMIT_FORM_SEASONAL_REQUEST, submitFormSeasonalWorker);
}
