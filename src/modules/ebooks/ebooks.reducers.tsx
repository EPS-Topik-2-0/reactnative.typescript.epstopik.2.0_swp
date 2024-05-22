import {
  EBOOKS_FAILURE,
  EBOOKS_REQUEST,
  EBOOKS_SUCCESS
} from "./index";

const initialState = {
  loading: false,
  error: false,
  theme: "light",
  language: "en",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    //SCHEDULES_REQUEST
    case EBOOKS_REQUEST:
      return { ...state, loading: true, error: false };
    case EBOOKS_SUCCESS:
      return { ...state, loading: false, error: false, ...action.payload };
    case EBOOKS_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };

    /**
     * DEFAULT_CASE
     */
    default:
      return state;
  }
};
export default reducer;
