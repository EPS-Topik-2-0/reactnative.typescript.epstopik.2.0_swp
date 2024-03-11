import { connect } from "react-redux";
import Screen from "../screens/screenResult";
import {resultProfile} from '../modules/schedule';
const mapStateToProps = (state: any) => ({
   resultProfile:state?.schedule?.resultProfile,
   errorResultProfile: state?.schedule?.errorResultProfile,

});
const mapDispatchToProps = {
   useResultProfile:resultProfile
};
let HomePage = connect(mapStateToProps, mapDispatchToProps)(Screen);
export default HomePage;
