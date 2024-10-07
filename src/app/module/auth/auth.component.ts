import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'] // Corrected property name from styleUrl to styleUrls
})
export class AuthComponent implements AfterViewInit {
  constructor(private authService: AuthService, private router: Router) { }
  ngAfterViewInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
