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
        console.log('Time logged for:', this.logDate, this.startTime, 'to', this.endTime);
    }

    applyForLeave(): void {
        console.log('Leave applied from', this.leaveStart, 'to', this.leaveEnd, 'for reason:', this.leaveReason);
    }
}