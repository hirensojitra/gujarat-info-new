import {
  AuthService
} from "./chunk-2FCY3S33.js";
import {
  CookieService
} from "./chunk-BM7BGPBE.js";
import {
  PlatformService
} from "./chunk-QJMPY6Q2.js";
import {
  Router,
  __async,
  of,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-B5FGZX5H.js";

// src/app/common/guards/auth.guard.ts
var AuthGuard = class _AuthGuard {
  constructor(authService, router, platformService) {
    this.authService = authService;
    this.router = router;
    this.platformService = platformService;
  }
  canActivate(route, state) {
    return __async(this, null, function* () {
      if (this.platformService.isBrowser()) {
        if (this.authService.isAuthenticated()) {
          return true;
        } else {
          this.router.navigate(["/auth/login"], { queryParams: { returnUrl: state.url } });
          return false;
        }
      }
      if (!this.authService.isAuthenticated()) {
        return false;
      }
      return true;
    });
  }
  static {
    this.\u0275fac = function AuthGuard_Factory(t) {
      return new (t || _AuthGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router), \u0275\u0275inject(PlatformService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthGuard, factory: _AuthGuard.\u0275fac, providedIn: "root" });
  }
};

// src/app/common/guards/role.guard.ts
var RoleGuard = class _RoleGuard {
  constructor(authService, router, platformService, cookieService) {
    this.authService = authService;
    this.router = router;
    this.platformService = platformService;
    this.cookieService = cookieService;
  }
  canActivate(route, state) {
    const expectedRoles = route.data["role"] || [];
    if (!this.platformService.isBrowser()) {
      const isAuthenticated = this.authService.isAuthenticated();
      if (!isAuthenticated) {
        return of(false);
      }
      const hasRole = this.authService.hasRole(expectedRoles);
      return of(hasRole);
    } else {
      if (this.authService.isAuthenticated()) {
        const hasRole = this.authService.hasRole(expectedRoles);
        if (hasRole) {
          return of(true);
        } else {
          this.router.navigate(["/broken-pages"]);
          return of(false);
        }
      } else {
        this.router.navigate(["/auth/login"]);
        return of(false);
      }
    }
  }
  static {
    this.\u0275fac = function RoleGuard_Factory(t) {
      return new (t || _RoleGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router), \u0275\u0275inject(PlatformService), \u0275\u0275inject(CookieService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RoleGuard, factory: _RoleGuard.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthGuard,
  RoleGuard
};
//# sourceMappingURL=chunk-42LY5BMY.js.map
