import {
 TERM_OF_USE_FAILURE,
 TERM_OF_USE_REQUEST,
 TERM_OF_USE_SUCCESS,

 ABOUT_US_FAILURE,
 ABOUT_US_REQUEST,
 ABOUT_US_SUCCESS,

 VIDEOS_FAILURE,
 VIDEOS_REQUEST,
 VIDEOS_SUCCESS
} from "./index";

const initialState = {
  loading: false,
  error: false,
  theme: "light",
  language: "en",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    //TERM_OF_USE_REQUEST
    case TERM_OF_USE_REQUEST:
      return { ...state, loading: true, error: false };
    case TERM_OF_USE_SUCCESS:
      return { ...state, loading: false, error: false, ...action.payload };
    case  TERM_OF_USE_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };

    //ABOUT_US_REQUEST
    case ABOUT_US_REQUEST:
      return { ...state, loading: true, error: false };
    case ABOUT_US_SUCCESS:
      return { ...state, loading: false, error: false, ...action.payload };
    case  ABOUT_US_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };

    //VIDEOS_REQUEST
    case VIDEOS_REQUEST:
      return { ...state, loading: true, error: false };
    case VIDEOS_SUCCESS:
      return { ...state, loading: false, error: false, ...action.payload };
    case  VIDEOS_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };

    /**
     * DEFAULT_CASE
     */
    default:
      return state;
  }
};
export default reducer;
