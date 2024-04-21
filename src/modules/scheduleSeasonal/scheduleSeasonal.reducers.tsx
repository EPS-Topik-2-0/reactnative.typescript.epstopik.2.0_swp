import {
  SCHEDULES_SEASONAL_REQUEST,
  SCHEDULES_SEASONAL_FAILURE,
  SCHEDULES_SEASONAL_SUCCESS,

  RESULT_PROFILE_SEASONAL_FAILURE,
  RESULT_PROFILE_SEASONAL_REQUEST,
  RESULT_PROFILE_SEASONAL_SUCCESS,

  JOBS_SEASONAL_FAILURE,
  JOBS_SEASONAL_REQUEST,
  JOBS_SEASONAL_SUCCESS,

  VERIFY_MEMBER_SEASONAL_FAILURE,
  VERIFY_MEMBER_SEASONAL_REQUEST,
  VERIFY_MEMBER_SEASONAL_SUCCESS,

  SUBMIT_FORM_SEASONAL_FAILURE,
  SUBMIT_FORM_SEASONAL_REQUEST,
  SUBMIT_FORM_SEASONAL_SUCCESS
} from "./index";


const initialState = {
  loading: false,
  error: false,
  theme: "light",
  language: "en",
};


const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    //SCHEDULES_SEASONAL
    case SCHEDULES_SEASONAL_REQUEST:
      return { ...state, loading: true, error: false,schedulesSeasonal:false };
    case SCHEDULES_SEASONAL_SUCCESS:
      return { ...state, loading: false, error: false, ...action.payload };
    case SCHEDULES_SEASONAL_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };
    
    //RESULT_PROFILE_SEASONAL
    case RESULT_PROFILE_SEASONAL_REQUEST:
      return { ...state,
        resultProfileSeasonal:false,
        loading: true, error: false };
    case RESULT_PROFILE_SEASONAL_SUCCESS:
      return { ...state,
        loading: false, error: false, ...action.payload };
    case RESULT_PROFILE_SEASONAL_FAILURE:
      return { ...state, 
        loading: false, error: true, ...action.payload };
  
    //JOBS_SEASONAL
    case JOBS_SEASONAL_REQUEST:
      return { ...state, loading: true, error: false };
    case JOBS_SEASONAL_SUCCESS:
      return { ...state, loading: false, error: false, ...action.payload };
    case JOBS_SEASONAL_FAILURE:
      return { ...state, loading: false,jobs:false, error: true, ...action.payload };

      //VERIFY_MEMBER_SEASONAL
    case VERIFY_MEMBER_SEASONAL_REQUEST:
      return { ...state, loading: true, error: false,verifyMemberSeasonal :false };
    case VERIFY_MEMBER_SEASONAL_SUCCESS:
      return { ...state, loading: false, error: false, ...action.payload };
    case VERIFY_MEMBER_SEASONAL_FAILURE:
      return { ...state, loading: false,jobs:false, error: true, ...action.payload };

    case SUBMIT_FORM_SEASONAL_REQUEST:
        return { ...state,
          errorLogin:false,
          loading: true, error: false,submitFormSeasonal:false };
      case SUBMIT_FORM_SEASONAL_SUCCESS:
        return { ...state,
          loading: false, error: false, ...action.payload };
      case SUBMIT_FORM_SEASONAL_FAILURE:
        return { ...state, loading: false, error: true, ...action.payload };
    
    /**
     * DEFAULT_CASE
     */
    default:
      return state;
  }
};
export default reducer;
