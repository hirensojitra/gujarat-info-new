import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Ensure you have this service
import { PlatformService } from '../services/platform.service'; // Ensure you have this service
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private platformService: PlatformService,
    private cookieService:CookieService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log(this.cookieService.get('user'))
    // Extract expected roles from the route
    const expectedRoles = route.data['role'] || [];

    // Check if running on the server
    if (!this.platformService.isBrowser()) {
      // Handle server-side logic
      const isAuthenticated = this.authService.isAuthenticated();
      if (!isAuthenticated) {
        return of(false); // Prevent access to the route
      }
      
      const hasRole = this.authService.hasRole(expectedRoles);
      return of(hasRole); // Return observable for server-side
    } else {
      // Client-side authentication and role check
      if (this.authService.isAuthenticated()) {
        const hasRole = this.authService.hasRole(expectedRoles); // Assuming hasRole is a synchronous check
        if (hasRole) {
          return of(true); // User is authenticated and has the required role
        } else {
          this.router.navigate(['/broken-pages']); // Redirect to unauthorized page
          return of(false); // Prevent access
        }
      } else {
        this.router.navigate(['/auth/login']);
        return of(false); // Prevent access and redirect to login
      }
    }
  }
}
