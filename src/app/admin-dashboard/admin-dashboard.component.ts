import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { EmployeeService } from '../employee.service'; // Import the service here

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  
  displayedColumns: string[] = ['id', 'username', 'email', 'contact', 'job', 'hours', 'absences', 'actions'];
  employees: any[] = [
    {id: 1, username: 'John Doe', email: 'johndoe@example.com', contact: '1234567890', job: 'Developer', hours: 40, absences: 0},
    {id: 2, username: 'Jane Doe', email: 'janedoe@example.com', contact: '0987654321', job: 'Designer', hours: 40, absences: 0}
  ];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private employeeService: EmployeeService // Inject the service here
  ) {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe((res: any) => {
      if (res && res.data) {
        this.employees = res.data;
      }
    }, (error) => {
      console.log("Failed to fetch employees:", error);
    });
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.addEmployee(result).subscribe(
          response => {
            console.log('Employee added!', response);
            this.fetchEmployees(); // Refresh the employees list after adding a new employee
          },
          error => console.log('Error adding employee:', error)
        );
      }
    });
  }  
  

  editEmployee(employee: any) {
    console.log(`Edit employee with ID: ${employee.id}`);
    // You can call the editEmployee method of the employeeService here
    this.employeeService.editEmployee(employee.id, employee).subscribe(
      response => {
        console.log('Employee edited!', response);
        this.fetchEmployees(); // Refresh the employees list after editing an employee
      },
      error => console.log('Error editing employee:', error)
    );
  }

  deleteEmployee(id: string) {
    console.log(`Delete employee with ID: ${id}`);
    // You can call the deleteEmployee method of the employeeService here
    this.employeeService.deleteEmployee(id).subscribe(
      response => {
        console.log('Employee deleted!', response);
        this.fetchEmployees(); // Refresh the employees list after deleting an employee
      },
      error => console.log('Error deleting employee:', error)
    );
  }
}