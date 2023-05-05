import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  login(user: string, password: string): any {
    const body = new HttpParams().set('user', user).set('password', password);
    return this.http.get('/login' + body);
  }
}
