import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../environment/api';
import { GenericNumber, GenericText } from '../models/generic';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  constructor(private http: HttpClient) {}

  async getHeader(): Promise<GenericText> {
    const observable = this.http.get<GenericText>(API.SERVER + API.HEADER);
    return await firstValueFrom(observable);
  }

  async getPackages(): Promise<GenericNumber[]> {
    const observable = this.http.get<GenericNumber[]>(
      API.SERVER + API.PACKAGES
    );
    return await firstValueFrom(observable);
  }
  async getAbout(): Promise<GenericText> {
    const observable = this.http.get<GenericText>(API.SERVER + API.ABOUT);
    return await firstValueFrom(observable);
  }
}
