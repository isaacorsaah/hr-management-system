import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getEmployees() { return this.http.get(`${this.apiUrl}/getEmployees`); }

  addEmployee(employee: any): Observable<any> { return this.http.post('http://localhost:3000/api/addEmployee', employee); }

  editEmployee(id: string, employeeData: any): Observable<any> { console.log(id); return this.http.put(`${this.apiUrl}/editEmployee/${id}`, employeeData); }

  deleteEmployee(id: string): Observable<any> { return this.http.delete(`${this.apiUrl}/deleteEmployee/${id}`); }
}