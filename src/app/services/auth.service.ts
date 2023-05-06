import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API } from "../environment/api";
import { firstValueFrom } from "rxjs";
import { GenericRequest } from "../models/generic";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  async login(user: string, password: string): Promise<string> {
    const body = new HttpParams().set("user", user).set("password", password);
    const observable = this.http.get<GenericRequest<string>>(
      API.SERVER + API.LOGIN,
      {
        params: body,
      }
    );

    const response = await firstValueFrom(observable);
    localStorage.setItem("token", response.data);
    return response.data;
  }

  async register(
    email: string,
    name: string,
    username: string,
    password: string
  ): Promise<void> {
    const body = {
      email: email,
      name: name,
      username: username,
      password: password,
    };

    const observable = this.http.post(API.SERVER + API.REGISTER, body);
    await firstValueFrom(observable);
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
    const user = await firstValueFrom(observable);
    localStorage.setItem("username", user.data.username);

    return user;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    this.router.navigate(["/login"]);
  }
}
