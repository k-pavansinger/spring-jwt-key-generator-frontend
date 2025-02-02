import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


export interface LoginRequest {
    username: string;
    password: string;
}
  
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { username: string, password: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials,{responseType : 'text'}).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res);
      })
    );
  }

  register(user: { username: string, email: string, password: string }) {
    return this.http.post(`${this.baseUrl}/register`, user,  { responseType: 'text' });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}