import { Component } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(public authService: AuthService, private router: Router) { }
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
