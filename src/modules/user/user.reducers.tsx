import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS
} from "./index";
const initialState = {
  loading: false,
  error: false,
  theme: "light",
  language: "en",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    //LOGIN_REQUEST
    case LOGIN_REQUEST:
      return { ...state,
        errorLogin:false,
        loading: true, error: false };
    case LOGIN_SUCCESS:
      return { ...state,
        loading: false, error: false, ...action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };
    //LOGOUT_REQUEST
    case LOGOUT_REQUEST:
      return { ...state, 
        logout:false,
        login: false, 
        loading: true, error: false };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: false,
        loading: false,
        error: false,
        logout:true,
        ...action.payload,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        login: false,
        loading: false,
        logout:false,
        error: true,
        ...action.payload,
      };
    //LOGIN_REQUEST
    case SIGNUP_REQUEST:
      return { ...state,
        errorLogin:false,
        loading: true, error: false };
    case SIGNUP_SUCCESS:
      return { ...state,
        loading: false, error: false, ...action.payload };
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };

    /**
     * DEFAULT_CASE
     */
    default:
      return state;
  }
};
export default reducer;
