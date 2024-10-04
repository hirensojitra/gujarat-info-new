import { Component, OnInit } from '@angular/core';
// Adjust the import path as necessary
import { Subscription } from 'rxjs';
import { AuthService } from '../../common/services/auth.service';
import { UserService } from '../../common/services/user.service';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userSubscription = this.userService.getUser().subscribe((user) => {
      console.log(user)
      this.username = user?.username || null;
      this.name = this.userService.getFullName();
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.authService.logout();
  }
}
