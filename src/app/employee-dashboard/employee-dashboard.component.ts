import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  employeeName: string = '';
  timeOn: string = '8 hours';
  timeOff: string = '2 hours';

  logDate!: string;
  startTime!: string;
  endTime!: string;
  leaveStart!: string;
  leaveEnd!: string;
  leaveReason!: string;
  currentView: string = 'dashboard';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getLoggedInEmployee().subscribe(
      (data) => {
        this.employeeName = data.name;
      },
      (error) => {
        console.error('Error fetching logged-in employee:', error);
      }
    );
  }

  navigate(view: string): void {
    this.currentView = view;
  }

  logTime(): void {
    this.employeeService.logTime(this.logDate, this.startTime, this.endTime).subscribe(
      (response) => {
        console.log('Time logged successfully', response);
        // Add logic to update any relevant data after successful logging
      },
      (error) => {
        console.error('Error logging time:', error);
      }
    );
  }

  applyForLeave(): void {
    const leaveData = {
      startDate: this.leaveStart,
      endDate: this.leaveEnd,
      reason: this.leaveReason,
    };

    this.employeeService.applyForLeave(leaveData).subscribe(
      (response) => {
        console.log('Leave applied successfully', response);
        // Add logic to update any relevant data after successful application
      },
      (error) => {
        console.error('Error applying for leave:', error);
      }
    );
  }
}