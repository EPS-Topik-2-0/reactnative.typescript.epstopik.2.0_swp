import {
  SUBMIT_FORM_FAILURE,
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,

  VERIFY_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,

  PAYMENT_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,

  VERIFY_PAYMENT_FAILURE,
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,

  PUSH_BACK_MOBILE_REQUEST,
  PUSH_BACK_MOBILE_FAILURE,
  PUSH_BACK_MOBILE_SUCCESS,

  RESULT_PROFILE_FAILURE,
  RESULT_PROFILE_REQUEST,
  RESULT_PROFILE_SUCCESS,
} from "./index";
const initialState = {
  loading: false,
  error: false,
  theme: "light",
  language: "en",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    //SUBMIT_FORM_REQUEST
    case SUBMIT_FORM_REQUEST:
      return { ...state,
        errorLogin:false,
        loading: true, error: false };
    case SUBMIT_FORM_SUCCESS:
      return { ...state,
        loading: false, error: false, ...action.payload };
    case SUBMIT_FORM_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };
    //VERIFY_REQUEST
    case VERIFY_REQUEST:
      return { ...state,
        errorLogin:false,
        loading: true, error: false };
    case VERIFY_SUCCESS:
      return { ...state,
        loading: false, error: false, ...action.payload };
    case VERIFY_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };
    
      //PAYMENT_REQUEST
    case PAYMENT_REQUEST:
      return { ...state,
        errorLogin:false,
        loading: true, error: false };
    case PAYMENT_SUCCESS:
      return { ...state,
        loading: false, error: false, ...action.payload };
    case PAYMENT_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload, };
    
      //VERIFY_PAYMENT_REQUEST
    case VERIFY_PAYMENT_REQUEST:
      return { ...state,
        errorLogin:false,
        loading: true, error: false };
    case VERIFY_PAYMENT_SUCCESS:
      return { ...state,
        loading: false, error: false, ...action.payload };
    case VERIFY_PAYMENT_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };
    //PUSH_BACK_MOBILE_REQUEST
    case PUSH_BACK_MOBILE_REQUEST:
      return { ...state,
        errorLogin:false,
        loading: true, error: false };
    case PUSH_BACK_MOBILE_SUCCESS:
      return { ...state,
        loading: false, error: false, ...action.payload };
    case PUSH_BACK_MOBILE_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };
    //PUSH_BACK_MOBILE_REQUEST
    case RESULT_PROFILE_REQUEST:
      return { ...state,
        errorLogin:false,
        resultProfile:false,
        loading: true, error: false };
    case RESULT_PROFILE_SUCCESS:
      return { ...state,
        loading: false, error: false, ...action.payload };
    case RESULT_PROFILE_FAILURE:
      return { ...state, 
        resultProfile:false,
        loading: false, error: true, ...action.payload };

    /**
     * DEFAULT_CASE
     */
    default:
      return state;
  }
};
export default reducer;
