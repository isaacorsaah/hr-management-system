import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Check if user is authenticated on component initialization
    this.isLoggedIn = this.authService.getLoggedInUser() !== null;
  }

  logout(): void {
    // Call AuthService logout method to clear user authentication
    this.authService.logout();
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}