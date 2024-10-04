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

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Check if running on the browser
    if (this.platformService.isBrowser()) {
      // Client-side authentication check
      if (this.authService.isAuthenticated()) {
        return true; // User is authenticated
      } else {
        // Navigate to login if not authenticated
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
        return false; // Prevent access and redirect to login
      }
    }

    // If running on the server (SSR)
    if (!this.authService.isAuthenticated()) {
      // Do not attempt to navigate on the server
      return false; // Prevent access for unauthenticated users
    }

    return true; // Allow access if authenticated
  }
}
