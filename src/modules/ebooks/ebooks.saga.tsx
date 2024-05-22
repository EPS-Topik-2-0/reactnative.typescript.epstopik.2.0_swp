import { call, put, takeLatest, SagaReturnType } from "redux-saga/effects";
import {
  EBOOKS_FAILURE,
  EBOOKS_REQUEST,
  EBOOKS_SUCCESS
} from "./index";
import { axios } from "../../api";

function* ebooksWorker() {
  try {
    const ebooks: SagaReturnType<any> = yield call(
      axios.get,
      "/ebooks"
    );
    yield put({
      type: EBOOKS_SUCCESS,
      payload: {
        ebooks: Object(ebooks)?.data,
      },
    });
  } catch (e: any) {
    const parseError: SagaReturnType<any> = yield JSON.parse(JSON.stringify(e));
    const message: SagaReturnType<any> =
      Object(parseError)?.data || Object(parseError)?.response;
    yield put({
      type: EBOOKS_FAILURE,
      payload: { ebooks: [] },
    });
  }
}
export function* saga() {
  yield takeLatest(EBOOKS_REQUEST, ebooksWorker);
}
