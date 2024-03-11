import { ResponseData } from "./type";

export interface ResponseSchedule extends ResponseData {
  data: {
    id: number;
    special: number;
    name: string;
    dateStart: string;
    dateEnd: string;
    minBirthday: string;
    maxBirthday: string;
    price: number;
    open: number;
    status: number;
    wing: number;
    aba: number;
    bakong: number;
    folder: string;
  };
}
