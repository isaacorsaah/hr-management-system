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
      if (response.role === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else if (response.role === 'employee') {
        this.router.navigate(['/employee-dashboard']); 
      }
    }, error => {
      console.error('Login failed', error);
    });
  }
}