import { connect } from "react-redux";
import Screen from "../screens/screenLogin";
import { login } from "../modules/user";
const mapStateToProps = (state: any) => {
  return {
    login: state?.user?.login,
    loadingUser: state?.user?.loading,
    errorLogin: state?.user?.errorLogin,
  };
};
const mapDispatchToProps = {
  useLogin: login,
};
let ContextPage = connect(mapStateToProps, mapDispatchToProps)(Screen);
export default ContextPage;
