import { error, success, abort } from "@redux-requests/core";
import { APP_INIT } from "./index";
import { typeLanguages, typeTheme } from "../../types";
type Action = {
  type: string;
  payload?: any;
};
type ThemeType = {
  theme: typeTheme;
  nav: string;
};

export const SET_THEMING = "SET_THEMING";

export const SET_LANGUAGE = "SET_LANGUAGE";

export const setTheming = (payload: ThemeType) => ({
  type: SET_THEMING,
  payload,
});

export const setLanguage = (payload: typeLanguages) => ({
  type: SET_LANGUAGE,
  payload,
});

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

    // THEMING;
    case SET_THEMING: {
      return {
        ...state,
        theme: action.payload ? action.payload.theme : state.theme,
      };
    }

    // SET_LANGUAGE;
    case SET_LANGUAGE: {
      return {
        ...state,
        language: action.payload ? action.payload.language : state.language,
      };
    }

    /**
     * DEFAULT_CASE
     */
    default:
      return state;
  }
};
export default reducer;
