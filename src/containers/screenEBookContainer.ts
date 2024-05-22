import { connect } from "react-redux";
import ScreenView from "../screens/screenEBook";
import {  ebooks } from "../modules/ebooks";
const mapStateToProps = (state: any) => ({ 
   ebooks:state?.ebook?.ebooks,
   loadingEbooks: state?.ebook?.loading });
const mapDispatchToProps = {
   useEbooks:ebooks
};
let Screen = connect(mapStateToProps, mapDispatchToProps)(ScreenView);
export default Screen;
