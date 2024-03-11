import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
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
    case NOTIFICATION_REQUEST:
      return { ...state, loading: true, error: false };
    case NOTIFICATION_SUCCESS:
      return { ...state, loading: false, error: false, ...action.payload };
    case NOTIFICATION_FAILURE:
      return { ...state, loading: false, error: true, ...action.payload };

    /**
     * DEFAULT_CASE
     */
    default:
      return state;
  }
};
export default reducer;
