import { Component, OnInit } from '@angular/core';
// Adjust the import path as necessary
import { Subscription } from 'rxjs';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  username: string | null = null;
  name: string | null = null;
  private userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userSubscription = this.userService.getUser().subscribe((user) => {
      this.username = user?.username || null;
      this.name = this.userService.getFullName();
    });
  }

  ngOnDestroy() {

  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.authService.logout()
  }
}
