import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API } from "../environment/api";
import { GenericRequest } from "../models/generic";
import { firstValueFrom } from "rxjs";
import { PacksHistory, Voucher } from "../models/packs";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  async getPack(email: string): Promise<GenericRequest<PacksHistory>> {
    const body = {
      email: email,
    };
    
    const observable = this.http.get<GenericRequest<PacksHistory>>(
      API.BASE + API.PACK,
      {
        params: body,
      }
    );
    
    return await firstValueFrom(observable);
  }

  async getVoucher(
    email: string,
    minutes: number
  ): Promise<GenericRequest<Voucher>> {
    const body = {
      email: email,
      minutes: minutes,
    };

    const observable = this.http.get<GenericRequest<Voucher>>(
      API.BASE + API.VOUCHER,
      {
        params: body,
      }
    );
    return await firstValueFrom(observable);
  }

  async getUser(email: string): Promise<GenericRequest<User>> {
    const body = {
      email: email,
    };

    const observable = this.http.get<GenericRequest<User>>(
      API.BASE + API.USER_INFO,
      {
        params: body,
      }
    );
    return await firstValueFrom(observable);
  }

  async postUser(
    email: string,
    name: string,
    username: string,
    password: string | null
  ): Promise<GenericRequest<User>> {
    const body = {
      name: name,
      username: username,
      email: email,
      password
    };

    const observable = this.http.put<GenericRequest<User>>(
      API.BASE + API.USER_INFO,
      body
    );
    return await firstValueFrom(observable);
  }

  async postPack(
    email: string,
    idPack: number
  ): Promise<GenericRequest<Voucher>> {
    const body = {
      email: email,
      idPack: idPack,
    };

    const observable = this.http.post<GenericRequest<Voucher>>(
      API.BASE + API.BUY_PACK,
      body
    );
    return await firstValueFrom(observable);
  }
}
