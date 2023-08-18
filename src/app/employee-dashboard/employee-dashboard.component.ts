import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  hours: number = 0;
  loggedInUser!: string;
  vacationBalance: number = 0; 
  sickLeaveBalance: number = 0;
  personalLeaveBalance: number = 0;
  selectedLeaveType: string = 'vacation';
  leaveHours: number = 0;
  startTime: string = '';
  endTime: string = '';
  previousHours: any[] = [];
  wantTimeOff: string = 'no';
  timeOffHours: number = 0;

  constructor(private http: HttpClient, private employeeService: EmployeeService) { }

  fetchLoggedInEmployee() {
    this.employeeService.getLoggedInEmployee().subscribe(data => {
      console.log("Logged in user data:", data);
      this.loggedInUser = data.username;
  }, error => {
      console.error('Error fetching logged in user:', error);
  });
  
 }
 

  ngOnInit(): void {
    this.fetchPreviousLoggedHours();  this.fetchLoggedInEmployee();
  }

  fetchPreviousLoggedHours() {
    this.employeeService.getPreviousLoggedHours().subscribe(
      data => {
        this.previousHours = data;
      },
      error => {
        console.error("Error fetching previous logged hours:", error);
      }
    );
}

  requestTimeOff() {
    if (this.wantTimeOff === 'yes' && this.timeOffHours > 0) {
      const requestData = {
        wantsTimeOff: true,
        hours: this.timeOffHours
      };
      
      this.employeeService.requestTimeOff(requestData).subscribe(
        response => {
          console.log("Time off requested successfully.");
        },
        error => {
          console.error("Error requesting time off:", error);
        }
      );
    } else {
    }
  }
  
  
 
  
  logHours() {
    const data = {
        logDate: new Date().toISOString().split('T')[0],
        startTime: this.startTime,
        endTime: this.endTime
    };
  
    this.employeeService.logTime(data).subscribe(
        response => {
            console.log('Hours logged successfully:', response);
            this.hours = response.workedHours;
        },
        error => {
            console.error('Error logging hours:', error);
        }
    );
  }



  requestLeave() {
    const leaveData = {
      type: this.selectedLeaveType,
      hours: this.leaveHours
    };
    this.employeeService.applyForLeave(this.loggedInUser, leaveData).subscribe(

      response => {
        console.log("Leave requested successfully.");
      },
      error => {
        console.error("Error requesting leave:", error);
      }
    );
  }
}