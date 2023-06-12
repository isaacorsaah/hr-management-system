import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['employee', Validators.required]
    });
  }  

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['Admin', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      console.log("Invalid credentials");
      return;
    }

    console.log(this.registerForm.value)
    //const { email, username, password, role } = this.registerForm.value;
    this.authService.register(this.registerForm.value).subscribe((response: any) => {
      // Handle the response here
      console.log(response);
    }, (error: any) => {
      console.error('Registration failed', error);
    });
  }
}