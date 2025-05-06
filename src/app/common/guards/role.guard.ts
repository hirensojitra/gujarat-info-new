// src/app/common/guards/role.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { PlatformService }   from '../services/platform.service';
import { AuthCookieService } from '../services/auth-cookie.service';
import { Observable, of }    from 'rxjs';
import { map, catchError }   from 'rxjs/operators';
import { RoleService } from '../services/role.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private platform: PlatformService,
    private authCookie: AuthCookieService,
    private rolesService: RoleService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree> {
    if (!this.platform.isBrowser()) {
      return of(false);
    }
    const returnUrl = state.url;

    if (!this.authCookie.isLoggedIn()) {
      return of(this.router.createUrlTree(
        ['/authentication/login'],
        { queryParams: { returnUrl }}
      ));
    }

    // decode the JWT payload
    const raw = this.authCookie.getToken() || '';
    let payload: any;
    try {
      const b64 = raw.split('.')[1]
                     .replace(/-/g, '+')
                     .replace(/_/g, '/');
      payload = JSON.parse(atob(b64));
    } catch {
      return of(this.router.createUrlTree(
        ['/authentication/login'],
        { queryParams: { returnUrl }}
      ));
    }
    const userRoleId = String(payload.role_id);

    // expected roleCodes array
    const expectedCodes: string[] = route.data['roleCode'] || [];
    if (!expectedCodes.length) {
      return of(true);
    }

    return this.rolesService.getRoles().pipe(
      map(list => list.filter(r => expectedCodes.includes(r.code))),
      map(allowedRoles => {
        if (!allowedRoles.length) {
          // route data misconfigured
          return this.router.createUrlTree(['/broken-pages/unauthorized']);
        }
        if (allowedRoles.some(r => r.id === userRoleId)) {
          return true;
        }
        // user not in the allowed set
        return this.router.createUrlTree(
          ['/broken-pages/unauthorized'],
          { queryParams: { returnUrl, expected: expectedCodes.join(',') }}
        );
      }),
      catchError(() =>
        of(this.router.createUrlTree(['/broken-pages/unauthorized']))
      )
    );
  }
}
