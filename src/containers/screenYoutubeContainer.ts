import { connect } from "react-redux";
import ScreenYoutube from "../screens/screenYoutube";
const mapStateToProps = (state: any) => ({ ...state });
const mapDispatchToProps = {};
let Screen = connect(mapStateToProps, mapDispatchToProps)(ScreenYoutube);
export default Screen;
