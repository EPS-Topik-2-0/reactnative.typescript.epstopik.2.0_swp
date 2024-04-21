import appReducer from "../modules/app/app.reducers";
import homeReducer from "../modules/home/home.reducers";
import notificationReducer from "../modules/notification/notification.reducers";
import userReducer from "../modules/user/user.reducers";
import scheduleReducer from "../modules/schedule/schedule.reducers";
import paymentReducer from "../modules/payment/payment.reducers";
import termOfUseReducer from "../modules/termOfUse/termOfUse.reducers";
import scheduleSeasonalReducer from "../modules/scheduleSeasonal/scheduleSeasonal.reducers";

export default {
  app: appReducer,
  home: homeReducer,
  notification: notificationReducer,
  user: userReducer,
  schedule:scheduleReducer,
  payment:paymentReducer,
  termOfUse:termOfUseReducer,
  scheduleSeasonal:scheduleSeasonalReducer
};
