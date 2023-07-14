import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
})
export class AddEmployeeDialogComponent {
  employee = {
    username: '',
    email: '',
    contact: '',
    job: '',
    hours: '',
    absences: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveEmployee(): void {
    this.dialogRef.close(this.employee);
  }
}