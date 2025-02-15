import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


export interface LoginRequest {
    username: string;
    password: string;
}
  
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

interface DecodedToken {
    sub: string;
    roles: string[];
    exp: number;
    iat: number;
  }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  private currentUser = new BehaviorSubject<{ username: string, roles: string[] } | null>(null);

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

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  private decodeToken(token: string): DecodedToken {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return { sub: '', roles: [], exp: 0, iat: 0 };
    }
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decoded = this.decodeToken(token);
    return decoded.roles?.includes('ADMIN') || false;
  }
}