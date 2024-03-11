import { notification } from "./../modules/notification";
import { connect } from "react-redux";
import ScreenNotification from "../screens/screenNotification";
const mapStateToProps = (state: any) => {
  return {
    notifications: state?.notification?.notifications,
    notificationLoading: state?.notification?.loading,
  };
};
const mapDispatchToProps = {
  useNotification: notification,
};
let Screen = connect(mapStateToProps, mapDispatchToProps)(ScreenNotification);
export default Screen;
