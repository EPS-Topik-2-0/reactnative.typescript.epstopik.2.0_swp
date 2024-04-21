import { error, success, abort } from "@redux-requests/core";
import { APP_INIT } from "./index";

type Action = {
  type: string;
  payload?: any;
};


export const SET_THEMING = "SET_THEMING";

export const SET_LANGUAGE = "SET_LANGUAGE";

const initialState = {
  loading: false,
  error: false,
  theme: "light",
  language: "en",
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    //APP_INIT
    case APP_INIT: {
      return { ...state, loading: true };
    }
    case success(APP_INIT): {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case error(APP_INIT): {
      return { ...state, error: true, loading: false, ...action.payload };
    }
    case abort(APP_INIT): {
      return { ...state, loading: false };
    }

    /**
     * DEFAULT_CASE
     */
    default:
      return state;
  }
};
export default reducer;
