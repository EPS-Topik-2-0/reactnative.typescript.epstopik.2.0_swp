import {
  SIDE_INFO_REQUEST,
  SIDE_INFO_FAILURE,
  SIDE_INFO_SUCCESS,
  SCHEDULES_REQUEST,
  SCHEDULES_FAILURE,
  SCHEDULES_SUCCESS,
  JOBS_FAILURE,
  JOBS_REQUEST,
  JOBS_SUCCESS
} from "./index";

const initialState = {
  loading: false,
  error: false,
  theme: "light",
  language: "en",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    //SIDE_INFO_REQUEST
    case SIDE_INFO_REQUEST:
      return { ...state, loading: true, error: false };
    case SIDE_INFO_SUCCESS:
      return { ...state, loading: false, error: false, ...action.payload };
    case SIDE_INFO_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };

    //SCHEDULES_REQUEST
    case SCHEDULES_REQUEST:
      return { ...state, loading: true, error: false };
    case SCHEDULES_SUCCESS:
      return { ...state, loading: false, error: false, ...action.payload };
    case SCHEDULES_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };

    //JOBS_REQUEST
    case JOBS_REQUEST:
      return { ...state, loading: true, error: false };
    case JOBS_SUCCESS:
      return { ...state, loading: false,errorJobs:false, error: false, ...action.payload };
    case JOBS_FAILURE:
      return { ...state, loading: false,jobs:false, error: true, ...action.payload };

    /**
     * DEFAULT_CASE
     */
    default:
      return state;
  }
};
export default reducer;
