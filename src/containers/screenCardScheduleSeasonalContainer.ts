import { connect } from "react-redux";
import Screen from "../screens/screenResultSeasonal";
import {resultProfileSeasonal} from '../modules/scheduleSeasonal';
const mapStateToProps = (state: any) => ({
   resultProfileSeasonal:state?.scheduleSeasonal?.resultProfileSeasonal,
});
const mapDispatchToProps = {
   useResultProfileSeasonal:resultProfileSeasonal
};
let HomePage = connect(mapStateToProps, mapDispatchToProps)(Screen);
export default HomePage;
