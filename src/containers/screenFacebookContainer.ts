import { connect } from "react-redux";
import ScreenView from "../screens/screenFacebook";
const mapStateToProps = () => ({});
const mapDispatchToProps = {};
let Screen = connect(mapStateToProps, mapDispatchToProps)(ScreenView);
export default Screen;
