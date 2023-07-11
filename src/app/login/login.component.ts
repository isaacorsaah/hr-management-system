import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
  const { email, password } = form.value;
  this.authService.login(email, password).subscribe((response: any) => {
    if (response.role === 'Admin') {
      this.router.navigate(['/admin'])
        .then(() => console.log('Navigation to admin succeeded.'))
        .catch((err) => console.error('Navigation to admin failed:', err));
    } else if (response.role === 'Employee') {
      this.router.navigate(['/employee'])
        .then(() => console.log('Navigation to employee dashboard succeeded.'))
        .catch((err) => console.error('Navigation to employee dashboard failed:', err));
    }
  }, error => {
    console.error('Login failed', error);
  });
  }
}