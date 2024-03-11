import {
  DEEP_LINK_FAILURE,
  DEEP_LINK_REQUEST,
  DEEP_LINK_SUCCESS
} from "./index";

const initialState = {
  loading: false,
  error: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    //DEEP_LINK_REQUEST
    case DEEP_LINK_REQUEST:{
      return { ...state, loading: true, error: false };
    }
    case DEEP_LINK_SUCCESS:{
      return { ...state, loading: false, error: false, ...action.payload };
    }
    case DEEP_LINK_FAILURE:{
      return { ...state, loading: false, error: true, ...action.payload };
    }

    /**
     * DEFAULT_CASE
     */
    default:
      return state;
  }
};
export default reducer;
