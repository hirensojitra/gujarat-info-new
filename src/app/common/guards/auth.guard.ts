import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PlatformService } from '../services/platform.service'; // Ensure you have this service

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private platformService: PlatformService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if running on the server
    if (!this.platformService.isBrowser()) {
      // Handle server-side logic
      const isAuthenticated = this.authService.isAuthenticated();
      if (!isAuthenticated) {
        return false; // Prevent access to the route
      }
    } else {
      // Client-side authentication check
      if (this.authService.isAuthenticated()) {
        return true; // User is authenticated
      } else {
        this.router.navigate(['/auth/login']);
        return false; // Prevent access and redirect to login
      }
    }

    return true; // Allow access if authenticated
  }
}
