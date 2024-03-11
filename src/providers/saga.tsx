import { all } from "redux-saga/effects";
import { saga as homeSaga } from "../modules/home/home.saga";
import { appSaga } from "../modules/app/app.saga";
import { saga as notificationSaga } from "../modules/notification/notification.saga";
import { saga as userSaga } from "../modules/user/user.saga";
import { saga as scheduleSaga } from "../modules/schedule/schedule.saga";
import { saga as paymentSaga } from "../modules/payment/payment.saga";
import { saga as termOfUseSaga } from "../modules/termOfUse/termOfUse.saga";

const sagas = [homeSaga(), appSaga(), notificationSaga(), userSaga(),scheduleSaga(),paymentSaga(),termOfUseSaga()];

export default function* () {
  yield all(sagas);
}
