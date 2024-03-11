import { connect } from "react-redux";
import Screen from "../screens/screenSchedule";
import { jobs,schedules } from "../modules/home";
import { submitForm,
   resultProfile,
   verify,payment,verifyPayment,pushBackMobile } from "../modules/schedule";
import {getDeepLink} from '../modules/payment';


const mapStateToProps = (state: any) => ({
   jobs:state?.home?.jobs,
   schedules:state?.home?.schedules,
   loadingHome: state?.home?.loading,
   errorJobs: state?.home?.errorJobs,
   
   loadingSchedule: state?.schedule?.loading,
   submitForm:state?.schedule?.submitForm,
   errorSubmitForm: state?.schedule?.errorSubmitForm,
   verify:state?.schedule?.verify,
   errorVerify: state?.schedule?.errorVerify,

   payment:state?.schedule?.payment,
   errorPayment: state?.schedule?.errorPayment,

   verifyPayment:state?.schedule?.verifyPayment,
   errorPushBack: state?.schedule?.errorVerifyPayment,

   pushBackMobile:state?.schedule?.pushBackMobile,
   errorPushBackMobile: state?.schedule?.errorPushBackMobile,

   resultProfile:state?.schedule?.resultProfile,
   errorResultProfile: state?.schedule?.errorResultProfile,
   
});
const mapDispatchToProps = {
   useJobs:jobs,
   useSchedules:schedules,
   useSubmitForm:submitForm,
   useVerify:verify,
   usePayment:payment,
   useVerifyPayment:verifyPayment,
   usePushBackMobile:pushBackMobile,
   useResultProfile:resultProfile,

   useDeepLink:getDeepLink
};
let Page = connect(mapStateToProps, mapDispatchToProps)(Screen);
export default Page;
