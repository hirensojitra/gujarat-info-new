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
    if (this.platformService.isBrowser()) {
      if (this.authService.isAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false; // Prevent access and redirect to login
      }
    }
    if (!this.authService.isAuthenticated()) {
      return false;
    }
    return true;
  }
}
