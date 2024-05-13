import { connect } from "react-redux";
import ScreenView from "../screens/screenEBook";
import {  videos } from "../modules/termOfUse";
const mapStateToProps = (state: any) => ({ 
   videos:state?.termOfUse?.videos,
   loadingTermOfUse: state?.termOfUse?.loading });
const mapDispatchToProps = {
   useVideos:videos
};
let Screen = connect(mapStateToProps, mapDispatchToProps)(ScreenView);
export default Screen;
