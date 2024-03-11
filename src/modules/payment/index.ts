export const DEEP_LINK_REQUEST = "DEEP_LINK_REQUEST";
export const DEEP_LINK_SUCCESS = "DEEP_LINK_SUCCESS";
export const DEEP_LINK_FAILURE = "DEEP_LINK_FAILURE";

export const getDeepLink = (payload: any) => ({
  type: DEEP_LINK_REQUEST,
  payload,
});