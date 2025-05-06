import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { PlatformService } from '../services/platform.service';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private platformService: PlatformService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.platformService.isBrowser()) {
      return of(false); // Skip role checks on server-side
    }

    const expectedRoles = route.data['roles'] || [];
    return this.checkAuthorization(state.url, expectedRoles);
  }

  private checkAuthorization(returnUrl: string, expectedRoles: string[]): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.navigateToLogin(returnUrl);
          return false;
        }

        if (!this.authService.hasRole(expectedRoles)) {
          this.router.navigate(['/unauthorized'], { 
            queryParams: { returnUrl },
            queryParamsHandling: 'merge'
          });
          return false;
        }

        return true;
      }),
      catchError(() => {
        this.navigateToLogin(returnUrl);
        return of(false);
      })
    );
  }

  private navigateToLogin(returnUrl: string): void {
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl },
      queryParamsHandling: 'merge'
    });
  }
}