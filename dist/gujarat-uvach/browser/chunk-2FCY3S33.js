import {
  CookieService,
  UserService
} from "./chunk-BM7BGPBE.js";
import {
  LoaderService
} from "./chunk-AM4HOOHV.js";
import {
  environment
} from "./chunk-UHQMXXXD.js";
import {
  HttpClient,
  HttpHeaders,
  Observable,
  Router,
  catchError,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-B5FGZX5H.js";

// src/app/common/services/auth.service.ts
var AuthService = class _AuthService {
  constructor(http, cookieService, userService, router, loaderService) {
    this.http = http;
    this.cookieService = cookieService;
    this.userService = userService;
    this.router = router;
    this.loaderService = loaderService;
    this.apiUrl = environment.MasterApi + "/auth";
  }
  // Login user method
  loginUser(username, password) {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }
  // Set token in the cookies
  setToken(token) {
    this.cookieService.set("token", token, {
      path: "/",
      // Ensures the cookie is available throughout the application
      secure: false
      // Set to true if you're using HTTPS
    });
  }
  // Get token method (no need for async here since cookies are accessed synchronously)
  getToken() {
    return this.cookieService.get("token");
  }
  // Check if the user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    return token ? true : false;
  }
  hasRole(expectedRoles) {
    const userString = this.cookieService.get("user");
    if (!userString) {
      console.warn("User cookie is missing or empty");
      return false;
    }
    let user = null;
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing user JSON:", error);
      return false;
    }
    if (user && user.roles) {
      const roles = user.roles;
      return expectedRoles.some((role) => roles.split(",").map((item) => item.trim()).includes(role));
    }
    return false;
  }
  resendVerificationEmail(email) {
    const payload = { email };
    return this.http.post(`${this.apiUrl}/resend-verification`, payload).pipe(catchError(this.handleError));
  }
  handleError(error) {
    let errorMessage = "An unknown error occurred";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 404) {
        errorMessage = "User not found";
      } else if (error.status === 400) {
        errorMessage = "Email is already verified";
      } else {
        errorMessage = `Server error: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
  validateToken() {
    const token = this.cookieService.get("token");
    if (!token) {
      return new Observable((observer) => {
        observer.error({ message: "No token provided" });
      });
    }
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
      // Send the token in the Authorization header
    });
    return this.http.post(`${environment.MasterApi}/validate-token`, {}, { headers });
  }
  logout() {
    this.cookieService.delete("token", "/");
    this.cookieService.delete("user", "/");
    this.router.navigate(["/login"]);
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(CookieService), \u0275\u0275inject(UserService), \u0275\u0275inject(Router), \u0275\u0275inject(LoaderService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-2FCY3S33.js.map
