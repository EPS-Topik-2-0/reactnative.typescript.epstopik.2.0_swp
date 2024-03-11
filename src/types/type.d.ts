/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InitialState {
  loading: boolean;
  data: any;
  error: any;
}
export interface ResponseData {
  statusCode: number;
  message: string;
  errorCode: string;
  data: any;
}