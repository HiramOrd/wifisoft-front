import { User } from "./user";

export interface PacksHistory {
  user: User;
  packs: Pack[];
}

export interface PackResume {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface Pack {
  hours: number;
  dateStart: string;
  dateEnd: null;
  hoursConsumed: number;
  percent: number;
  vouchers: Voucher[];
}

export interface Voucher {
  code: string;
  minutes: number;
  dateStart: string;
}

export interface Voucher {
  code: string;
  minutes: number;
}
