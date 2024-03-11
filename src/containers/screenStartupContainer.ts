import { connect } from "react-redux";
import { startup } from "../modules/app/";
import ScreenStartup from "../screens/screenStartup";
const mapStateToProps = (state: any) => {
  return {
    // sideInfo: state.sideInfo,
  };
};
const mapDispatchToProps = { startup };
let HomePage = connect(mapStateToProps, mapDispatchToProps)(ScreenStartup);
export default HomePage;
