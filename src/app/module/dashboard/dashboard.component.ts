import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../common/interfaces/commonInterfaces';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router, private userService: UserService) { }
  user: User;
  email: string = '';
  message: string = '';
  errorMessage: string = '';
  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {
      this.user = data
    })
  }
  resendVerification() {
    this.user.email && this.authService.resendVerificationEmail(this.user.email).subscribe(
      response => {
        this.message = response.message;  // Success message from backend
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = error;  // Error message from backend
        this.message = '';
      }
    );
  }
}
