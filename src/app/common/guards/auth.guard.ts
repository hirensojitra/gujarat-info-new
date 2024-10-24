import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PlatformService } from '../services/platform.service'; // Ensure you have this service
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the code is running in the browser
    if (this.platformService.isBrowser()) {
      // Call the isAuthenticated method which returns an Observable
      return this.authService.isAuthenticated().pipe(
        map(isAuth => {
          if (isAuth) {
            return true; // Access allowed
          } else {
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
            return false; // Prevent access and redirect to login
          }
        })
      );
    }

    // If it's not the browser, you may define your logic here, for now, return false
    return false;
  }
}
