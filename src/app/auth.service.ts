// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders({'Content-Type' : 'application/json'});
  private postHeadedr = {headers: this.headers, withCredentials: true };
  private getHeadedr = {withCredentials: true};
  constructor(private http: HttpClient) { }

  public register(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/register', data, this.postHeadedr);
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/login', { username, password }, this.postHeadedr);
  }
  public test():Observable<any>{
    return this.http.get('http://localhost:3000/api/test', this.getHeadedr);
  }
}