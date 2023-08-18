import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  addEmployee(employee: any, password: string): Observable<any> {
    const fullEmployeeData = {...employee, password};
    return this.http.post(`${this.apiUrl}/addEmployee`, fullEmployeeData);
  }
  getEmployees() { return this.http.get(`${this.apiUrl}/getEmployees`); }
  editEmployee(id: string, employeeData: any): Observable<any> { console.log(id); return this.http.put(`${this.apiUrl}/editEmployee/${id}`, employeeData); }
  deleteEmployee(id: string): Observable<any> { return this.http.delete(`${this.apiUrl}/deleteEmployee/${id}`); }
 
  getPreviousLoggedHours(): Observable<any> {
    return this.http.get(`${this.apiUrl}/previousLoggedHours`);
  }
   

  getLoggedInEmployee(): Observable<any> { return this.http.get(`${this.apiUrl}/loggedInEmployee`); }
  requestTimeOff(data: {wantsTimeOff: boolean, hours: number}): Observable<any> {
    return this.http.post(`${this.apiUrl}/timeOff`, data);
  }
  

 logTime(data: { logDate: string; startTime: string; endTime: string; }): Observable<any> {
  return this.http.post(`${this.apiUrl}/logTime`, data);
}


applyForLeave(loggedInUser: string, leaveData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/requestLeave/${loggedInUser}`, leaveData);
}

}