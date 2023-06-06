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
    const { username, password } = form.value;
    this.authService.login(username, password).subscribe(response => {
      if (response.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/employee']);
      }
    }, error => {
      console.error('Login failed', error);
    });
  }
}
