import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .subscribe((user: any) => {
        console.log(user);
        this.router.navigate([user.role + '-dashboard']);
      }, (error: any) => {
        console.log(error);
      });
  }
}
