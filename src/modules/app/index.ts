export const APP_INIT = "APP_INIT";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const useLogin = (payload: any) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const useLogout = () => ({
  type: LOGOUT_REQUEST,
});

export const startup = () => ({
  type: APP_INIT,
});
