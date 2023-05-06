import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API } from "../environment/api";
import { GenericRequest, GenericText } from "../models/generic";
import { firstValueFrom } from "rxjs";
import { PackResume } from "../models/packs";

@Injectable({
  providedIn: "root",
})
export class LandingService {
  constructor(private http: HttpClient) {}

  async getHeader(): Promise<GenericRequest<GenericText>> {
    console.log(API.BASE + API.HEADER);
    const observable = this.http.get<GenericRequest<GenericText>>(
      API.BASE + API.HEADER
    );
    return await firstValueFrom(observable);
  }

  async getPackages(): Promise<GenericRequest<PackResume[]>> {
    const observable = this.http.get<GenericRequest<PackResume[]>>(
      API.BASE + API.PACKAGES
    );
    return await firstValueFrom(observable);
  }
  async getAbout(): Promise<GenericRequest<GenericText>> {
    const observable = this.http.get<GenericRequest<GenericText>>(
      API.BASE + API.ABOUT
    );
    return await firstValueFrom(observable);
  }
}
