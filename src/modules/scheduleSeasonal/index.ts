export const SCHEDULES_SEASONAL_REQUEST = "SCHEDULES_SEASONAL_REQUEST";
export const SCHEDULES_SEASONAL_SUCCESS = "SCHEDULES_SEASONAL_SUCCESS";
export const SCHEDULES_SEASONAL_FAILURE = "SCHEDULES_SEASONAL_FAILURE";

export const RESULT_PROFILE_SEASONAL_REQUEST = "RESULT_PROFILE_SEASONAL_REQUEST";
export const RESULT_PROFILE_SEASONAL_SUCCESS = "RESULT_PROFILE_SEASONAL_SUCCESS";
export const RESULT_PROFILE_SEASONAL_FAILURE = "RESULT_PROFILE_SEASONAL_FAILURE";

export const JOBS_SEASONAL_REQUEST = "JOBS_SEASONAL_REQUEST";
export const JOBS_SEASONAL_SUCCESS = "JOBS_SEASONAL_SUCCESS";
export const JOBS_SEASONAL_FAILURE = "JOBS_SEASONAL_FAILURE";

export const  VERIFY_MEMBER_SEASONAL_REQUEST =  "VERIFY_MEMBER_SEASONAL_REQUEST";
export const  VERIFY_MEMBER_SEASONAL_SUCCESS =  "VERIFY_MEMBER_SEASONAL_SUCCESS";
export const  VERIFY_MEMBER_SEASONAL_FAILURE =  "VERIFY_MEMBER_SEASONAL_FAILURE";

export const SUBMIT_FORM_SEASONAL_REQUEST = "SUBMIT_FORM_SEASONAL_REQUEST";
export const SUBMIT_FORM_SEASONAL_SUCCESS = "SUBMIT_FORM_SEASONAL_SUCCESS";
export const SUBMIT_FORM_SEASONAL_FAILURE = "SUBMIT_FORM_SEASONAL_FAILURE";

export const schedulesSeasonal = (payload: unknown) => ({
  type: SCHEDULES_SEASONAL_REQUEST,
  payload,
});
export const resultProfileSeasonal = (payload: unknown) => ({
  type: RESULT_PROFILE_SEASONAL_REQUEST,
  payload,
});
export const jobsSeasonal = (payload:unknown) => ({
  type: JOBS_SEASONAL_REQUEST,
  payload
});
export const verifyMemberSeasonal = (payload:unknown) => ({
  type: VERIFY_MEMBER_SEASONAL_REQUEST,
  payload
});

export const submitFormSeasonal = (payload: unknown) => ({
  type: SUBMIT_FORM_SEASONAL_REQUEST,
  payload,
});


