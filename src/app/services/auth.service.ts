import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: any = null;

  constructor(private http: HttpClient) { }

  // login(email: string, password: string): Observable<any> {
  //   return this.http.post('/api/login', { email, password }).pipe(
  //     map((response: any) => {
  //       this.loggedInUser = response.user;
  //       return this.loggedInUser;
  //     })
  //   );
  // }  
  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login', { email, password });
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  logout(): void {
    this.loggedInUser = null;
  }
}