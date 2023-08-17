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
  addEmployee(employee: any, password: string): Observable<any> {
    const fullEmployeeData = {...employee, password};
    return this.http.post(`${this.apiUrl}/addEmployee`, fullEmployeeData);
  }
  editEmployee(id: string, employeeData: any): Observable<any> { console.log(id); return this.http.put(`${this.apiUrl}/editEmployee/${id}`, employeeData); }
  deleteEmployee(id: string): Observable<any> { return this.http.delete(`${this.apiUrl}/deleteEmployee/${id}`); }
  

  getLoggedInEmployee(): Observable<any> { return this.http.get(`${this.apiUrl}/loggedInEmployee`); }

  getEmployeeInfo(): Observable<any> { return this.http.get(`${this.apiUrl}/employeeInfo`); }
  getLogHours(): Observable<any> { return this.http.get(`${this.apiUrl}/logHours`); }
  getTimeOff(): Observable<any> { return this.http.get(`${this.apiUrl}/timeOff`); }
  getScheduledMeetings(): Observable<any> { return this.http.get(`${this.apiUrl}/scheduledMeetings`); }
  getTasks(): Observable<any> { return this.http.get(`${this.apiUrl}/tasks`); }
  logTime(logDate: string, startTime: string, endTime: string): Observable<any> {
    const data = {
      logDate: logDate,
      startTime: startTime,
      endTime: endTime
    };
    return this.http.post(`${this.apiUrl}/logTime`, data);
  }

  applyForLeave(leaveData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/applyForLeave`, leaveData);
  }
}
