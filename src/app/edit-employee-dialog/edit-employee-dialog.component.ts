import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface EmployeeData {
  employeeId: string;
  username: string;
  email: string;
  password: string;
  contact: string;
  job: string;
  hours: number;
  absences: number;
}

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})
export class EditEmployeeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}