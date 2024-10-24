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

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
