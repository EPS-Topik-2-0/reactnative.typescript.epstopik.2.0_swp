export const TERM_OF_USE_REQUEST = "TERM_OF_USE_REQUEST";
export const TERM_OF_USE_SUCCESS = "TERM_OF_USE_SUCCESS";
export const TERM_OF_USE_FAILURE = "TERM_OF_USE_FAILURE";

export const ABOUT_US_REQUEST = "ABOUT_US_REQUEST";
export const ABOUT_US_SUCCESS = "ABOUT_US_SUCCESS";
export const ABOUT_US_FAILURE = "ABOUT_US_FAILURE";

export const VIDEOS_REQUEST = "VIDEOS_REQUEST";
export const VIDEOS_SUCCESS = "VIDEOS_SUCCESS";
export const VIDEOS_FAILURE = "VIDEOS_FAILURE";

export const termOfUse = () => ({
  type: TERM_OF_USE_REQUEST,
});
export const aboutUs = () => ({
  type: ABOUT_US_REQUEST,
});
export const videos = () => ({
  type: VIDEOS_REQUEST,
});