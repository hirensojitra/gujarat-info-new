import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { PlatformService } from '../services/platform.service';
import { AuthCookieService } from '../services/auth-cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authCookie: AuthCookieService,
    private router: Router,
    private platformService: PlatformService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // 1️⃣ Only in browser
    if (!this.platformService.isBrowser()) {
      return false;
    }

    const returnUrl = state.url;

    // 2️⃣ Logged-in check
    const loggedIn = await this.authCookie.isLoggedIn();
    if (!loggedIn) {
      this.router.navigate(['/authentication/login'], {
        queryParams: { returnUrl },
        queryParamsHandling: 'merge',
      });
      return false;
    }

    // 3️⃣ Email-verified check
    const emailVerified = await this.authCookie.isEmailVerified();
    if (!emailVerified) {
      this.router.navigate(['/authentication/verify-email'], {
        queryParams: { returnUrl },
        queryParamsHandling: 'merge',
      });
      return false;
    }

    // 4️⃣ All good
    return true;
  }
}
