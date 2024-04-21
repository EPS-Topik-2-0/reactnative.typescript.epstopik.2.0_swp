import { connect } from "react-redux";
import Screen from "../screens/screenScheduleSeasonal";
import {schedulesSeasonal,
resultProfileSeasonal,
jobsSeasonal,
verifyMemberSeasonal,
submitFormSeasonal
} from '../modules/scheduleSeasonal'


const mapStateToProps = (state: any) => {
   return({
   schedulesSeasonal:state?.scheduleSeasonal?.schedulesSeasonal,
   resultProfileSeasonal:state?.scheduleSeasonal?.resultProfileSeasonal,
   jobsSeasonal:state?.scheduleSeasonal?.jobsSeasonal,
   verifyMemberSeasonal:state?.scheduleSeasonal?.verifyMemberSeasonal,
   submitFormSeasonal:state?.scheduleSeasonal?.submitFormSeasonal,
})};
const mapDispatchToProps = {
   useSchedulesSeasonal:schedulesSeasonal,
   useResultProfileSeasonal:resultProfileSeasonal,
   useJobsSeasonal:jobsSeasonal,
   useVerifyMemberSeasonal:verifyMemberSeasonal,
   useSubmitFormSeasonal:submitFormSeasonal
};
let Page = connect(mapStateToProps, mapDispatchToProps)(Screen);
export default Page;
