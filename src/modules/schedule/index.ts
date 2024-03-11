export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAILURE = "VERIFY_FAILURE";

export const SUBMIT_FORM_REQUEST = "SUBMIT_FORM_REQUEST";
export const SUBMIT_FORM_SUCCESS = "SUBMIT_FORM_SUCCESS";
export const SUBMIT_FORM_FAILURE = "SUBMIT_FORM_FAILURE";

export const PAYMENT_REQUEST = "PAYMENT_REQUEST";
export const PAYMENT_SUCCESS = "PAYMENT_SUCCESS";
export const PAYMENT_FAILURE = "PAYMENT_FAILURE";

export const VERIFY_PAYMENT_REQUEST = "VERIFY_PAYMENT_REQUEST";
export const VERIFY_PAYMENT_SUCCESS = "VERIFY_PAYMENT_SUCCESS";
export const VERIFY_PAYMENT_FAILURE = "VERIFY_PAYMENT_FAILURE";

export const PUSH_BACK_MOBILE_REQUEST = "PUSH_BACK_MOBILE_REQUEST";
export const PUSH_BACK_MOBILE_SUCCESS = "PUSH_BACK_MOBILE_SUCCESS";
export const PUSH_BACK_MOBILE_FAILURE = "PUSH_BACK_MOBILE_FAILURE";

export const RESULT_PROFILE_REQUEST = "RESULT_PROFILE_REQUEST";
export const RESULT_PROFILE_SUCCESS = "RESULT_PROFILE_SUCCESS";
export const RESULT_PROFILE_FAILURE = "RESULT_PROFILE_FAILURE";

export const submitForm = (payload: unknown) => ({
  type: SUBMIT_FORM_REQUEST,
  payload,
});

export const verify = (payload: unknown) => ({
  type: VERIFY_REQUEST,
  payload,
});

export const payment = (payload: unknown) => ({
  type: PAYMENT_REQUEST,
  payload,
});

export const verifyPayment = (payload: unknown) => ({
  type: VERIFY_PAYMENT_REQUEST,
  payload,
});

export const pushBackMobile = (payload: unknown) => ({
  type: PUSH_BACK_MOBILE_REQUEST,
  payload,
});

export const resultProfile = (payload: unknown) => ({
  type: RESULT_PROFILE_REQUEST,
  payload,
});