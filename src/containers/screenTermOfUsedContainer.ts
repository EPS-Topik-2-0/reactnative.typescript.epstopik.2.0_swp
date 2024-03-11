import { connect } from "react-redux";
import ScreenView from "../screens/screenTermOfUsed";
import {termOfUse} from '../modules/termOfUse';

const mapStateToProps = (state: any) =>{ 
   return(
   { 
   termOfUse:state?.termOfUse?.termOfUse,
   loading:state?.termOfUse?.loading
 })};
 
const mapDispatchToProps = {
   useTermOfUse:termOfUse
};
let Screen = connect(mapStateToProps, mapDispatchToProps)(ScreenView);
export default Screen;
