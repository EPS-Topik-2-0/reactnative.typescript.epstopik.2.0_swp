import { connect } from "react-redux";
import ScreenSignup from "../screens/screenSignup";
import { signUp } from "../modules/user";

const mapStateToProps = (state: any) => ({ 
   signUp:state?.user?.signUp,
   loadingUser: state?.user?.loading,
   errorSignUp: state?.user?.errorSignUp,
 });
const mapDispatchToProps = {
   useSignUp: signUp,
};
let HomePage = connect(mapStateToProps, mapDispatchToProps)(ScreenSignup);
export default HomePage;
