import { call, put, takeLatest, SagaReturnType } from "redux-saga/effects";
import {
  TERM_OF_USE_FAILURE,
  TERM_OF_USE_REQUEST,
  TERM_OF_USE_SUCCESS,
  ABOUT_US_FAILURE,
  ABOUT_US_REQUEST,
  ABOUT_US_SUCCESS,
  VIDEOS_FAILURE,
  VIDEOS_REQUEST,
  VIDEOS_SUCCESS
} from "./index";
import { axios } from "../../api";

function* getWorker() {
  try {
    const termOfUse: SagaReturnType<any> = yield call(
      axios.get,
      "/term-of-use"
    );
    yield put({
      type: TERM_OF_USE_SUCCESS,
      payload: {
        termOfUse:Object(termOfUse)?.data
      },
    });

  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: TERM_OF_USE_FAILURE,
      payload: { errorTermOfUse: message },
    });
  }
}

function* getAboutUsWorker() {
  try {
    const aboutUs: SagaReturnType<any> = yield call(
      axios.get,
      "/about-us"
    );
    yield put({
      type: ABOUT_US_SUCCESS,
      payload: {
        aboutUs:Object(aboutUs)?.data
      },
    });

  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: ABOUT_US_FAILURE,
      payload: { errorAboutUs: message },
    });
  }
}

function* getVideoWorker() {
  try {
    const videos: SagaReturnType<any> = yield call(
      axios.get,
      "/videos"
    );
    yield put({
      type: VIDEOS_SUCCESS,
      payload: {
        videos:Object(videos)?.data
      },
    });

  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
      yield put({
      type: VIDEOS_FAILURE,
      payload: { videos: [] },
    });
  }
}
export function* saga() {
  yield takeLatest(  TERM_OF_USE_REQUEST, getWorker);
  yield takeLatest(  ABOUT_US_REQUEST, getAboutUsWorker);
  yield takeLatest(  VIDEOS_REQUEST, getVideoWorker);
}
