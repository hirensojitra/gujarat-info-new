// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { getDisplayName } from 'src/app/common/helpers/display-name.helper';
import { UserPublicInfo } from 'src/app/graphql/types/login.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: UserPublicInfo | null = null;
  welcomeMessage = '';
  isLoggedIn:boolean;
  constructor(private authService: AuthenticationService) {}
  async ngOnInit(): Promise<void> {
    this.isLoggedIn = this.authService.isLoggedIn();
    await this.authService.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        const name = getDisplayName(user);
        this.welcomeMessage = `Welcome back, ${name}! Explore the new features at PostNew.in 🚀`;
      } else {
        this.welcomeMessage = `Welcome to PostNew.in - Create and share amazing posts easily! 🚀`;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
