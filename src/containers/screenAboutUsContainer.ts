import { connect } from "react-redux";
import ScreenView from "../screens/screenAboutUs";
import {aboutUs} from '../modules/termOfUse';

const mapStateToProps = (state: any) =>{ 
   return(
   { 
   aboutUs:state?.termOfUse?.aboutUs,
   loading:state?.termOfUse?.loading
 })};
 
const mapDispatchToProps = {
   useAboutUs:aboutUs
};
let Screen = connect(mapStateToProps, mapDispatchToProps)(ScreenView);
export default Screen;
