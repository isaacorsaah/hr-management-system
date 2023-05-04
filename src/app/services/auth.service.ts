import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: any = null;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login', { email, password }).pipe(
      map((response: any) => {
        // Save the logged in user in a private property
        this.loggedInUser = response.user;
        return this.loggedInUser;
      })
    );
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  logout(): void {
    // Clear the logged in user from the private property
    this.loggedInUser = null;
  }
}