// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http: HttpClient) { }

  register(username: string, password: string, role: string, email: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/register', { username, password, role, email }, { headers: this.headers });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/login', { username, password }, { headers: this.headers });
  }
}