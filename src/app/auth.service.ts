import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>('/register', { username, password, role });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/login', { username, password });
  }
}