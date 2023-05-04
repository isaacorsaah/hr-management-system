import { Component, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('emailInput', {static: true}) emailInput: ElementRef | undefined;
  @ViewChild('passwordInput', {static: true}) passwordInput: ElementRef | undefined;

  constructor(private authService: AuthService, private router: Router) { 
    this.emailInput = undefined;
    this.passwordInput = undefined;
  }

  login(): void {
    if (this.emailInput && this.passwordInput) {
      this.email = this.emailInput.nativeElement.value;
      this.password = this.passwordInput.nativeElement.value;
      this.authService.login(this.email, this.password);
    }
  }

  onSubmit() {
    if (this.emailInput && this.passwordInput) {
      this.authService.login(this.email, this.password)
        .subscribe((user: any) => {
          console.log(user);
          if (user.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (user.role === 'employee') {
            this.router.navigate(['/employee-dashboard']);
          }
        }, (error: any) => {
          console.log(error);
        });
    }
  }
}
