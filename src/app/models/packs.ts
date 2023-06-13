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
  minutes: number;
  dateStart: string;
  dateEnd: null | string;
  minutesConsumed: number;
  percent: number;
  vouchers: Voucher[];
  type: string;
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

export interface DashboardChart{
  labels: string[],
  datasets: [
    {
      label: string,
      data: number[]
    }
  ]
}
