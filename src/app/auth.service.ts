import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };

    return this.http.post(this.apiUrl, body);
  }
}