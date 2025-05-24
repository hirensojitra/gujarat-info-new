import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { PlatformService } from '../services/platform.service';

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
  ): Observable<boolean> {
    if (this.platformService.isBrowser()) {
      return this.checkAuth(state.url);
    }
    return of(false);
  }
  private checkAuth(returnUrl: string): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }
        this.router.navigate(['/auth/login'], {
          queryParams: { returnUrl },
          queryParamsHandling: 'merge'
        });
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/auth/login'], { 
          queryParams: { returnUrl },
          queryParamsHandling: 'merge'
        });
        return of(false);
      })
    );
  }
}