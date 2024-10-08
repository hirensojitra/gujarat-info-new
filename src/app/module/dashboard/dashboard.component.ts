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
  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {
      this.user = data
    })
  }
}
