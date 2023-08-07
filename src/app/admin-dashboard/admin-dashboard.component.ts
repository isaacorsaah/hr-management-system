import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { EmployeeService } from '../employee.service';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'password', 'contact', 'job', 'hours', 'absences', 'actions'];
  employees: any[] = [];

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((response: any) => {
      console.log(response);
      this.employees = response.data;
    });
  }
  

  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const password = result.password;
        delete result.password;
        this.employeeService.addEmployee(result,password).subscribe(
          response => {
            console.log('Employee added!', response);
            this.getEmployees();
          },
          error => console.log('Error adding employee:', error)
        );
      }
    });
  }  

  editEmployee(employee: any) {
    console.log(employee._id);
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.editEmployee(employee._id, result).subscribe(
          response => {
            console.log('Employee edited!', response);
            this.getEmployees();
          },
          error => console.log('Error editing employee:', error)
        );
      }
    });
  }

  deleteEmployee(employee: any) {
    console.log(`Delete employee with ID: ${employee._id}`);
    this.employeeService.deleteEmployee(employee._id).subscribe(
      response => {
        console.log('Employee deleted!', response);
        this.getEmployees();
      },
      error => console.log('Error deleting employee:', error)
    );
  } 
}