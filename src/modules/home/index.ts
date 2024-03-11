export const SIDE_INFO_REQUEST = "SIDE_INFO_REQUEST";
export const SIDE_INFO_SUCCESS = "SIDE_INFO_SUCCESS";
export const SIDE_INFO_FAILURE = "SIDE_INFO_FAILURE";

export const SCHEDULES_REQUEST = "SCHEDULES_REQUEST";
export const SCHEDULES_SUCCESS = "SCHEDULES_SUCCESS";
export const SCHEDULES_FAILURE = "SCHEDULES_FAILURE";

export const JOBS_REQUEST = "JOBS_REQUEST";
export const JOBS_SUCCESS = "JOBS_SUCCESS";
export const JOBS_FAILURE = "JOBS_FAILURE";

export const sideInfo = (payload: any) => ({
  type: SIDE_INFO_REQUEST,
  payload,
});

export const schedules = (payload:unknown) => ({
  type: SCHEDULES_REQUEST,
  payload
});

export const jobs = (payload:unknown) => ({
  type: JOBS_REQUEST,
  payload
});
