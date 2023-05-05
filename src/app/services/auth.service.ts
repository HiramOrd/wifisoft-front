import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private httpClientService: HttpClientService
  ) {}

  login(user: string, password: string): any {
    return this.httpClientService.login(user, password);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
