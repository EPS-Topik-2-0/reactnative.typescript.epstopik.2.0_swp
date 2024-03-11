import { connect } from "react-redux";
import ScreenHome from "../screens/screenHome";
import { sideInfo, schedules } from "../modules/home";
const mapStateToProps = (state: any) => {
  return {
    sideInfo: state?.home?.sideInfo,

    schedules: state?.home?.schedules,
    errorSchedules: state?.home?.errorSchedules,
    homeLoading: state?.home?.loading,
  };
};
const mapDispatchToProps = {
  useSideInfo: sideInfo,
  useSchedules: schedules,
};
let HomePage = connect(mapStateToProps, mapDispatchToProps)(ScreenHome);
export default HomePage;
