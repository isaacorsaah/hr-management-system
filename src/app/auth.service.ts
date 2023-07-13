import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';
  private isAuthenticated = false;
  private role: string = '';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };

    return this.http.post<{token: string, role: string, email: string}>(this.apiUrl, body).pipe(
      tap(response => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.email);
        this.role = response.role;
        this.isAuthenticated = true;
      })
    );
  }

  isLoggedIn(): boolean { return !!localStorage.getItem('token') && this.isAuthenticated; }

  getRole(): string { return this.role; }

  getEmail(): string { return localStorage.getItem('email') ?? ''; }  

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isAuthenticated = false;
    this.role = '';
  }
}