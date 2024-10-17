import './polyfills.server.mjs';
import {
  AuthService
} from "./chunk-N3IZ42AQ.mjs";
import "./chunk-XZCEH4RM.mjs";
import {
  AsteriskDirective,
  SharedModule,
  ToastService
} from "./chunk-EEUSAIS4.mjs";
import "./chunk-SJGHJV2H.mjs";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-YA4RVP7S.mjs";
import {
  UserService
} from "./chunk-X5USKXOP.mjs";
import "./chunk-BVVXM5P4.mjs";
import {
  CommonModule,
  Router,
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-5I3IBUKT.mjs";
import {
  __async
} from "./chunk-24VIC3GD.mjs";

// src/app/module/auth/login/login.component.ts
var LoginComponent = class _LoginComponent {
  constructor(fb, userService, authService, router, toast) {
    this.fb = fb;
    this.userService = userService;
    this.authService = authService;
    this.router = router;
    this.toast = toast;
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
    });
  }
  // Handle form submission for login
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.loginUser(loginData.username, loginData.password).subscribe((response) => {
        if (response.token) {
          this.userService.setUser(response);
          this.authService.setToken(response.token);
          this.userService.getUser().subscribe((data) => {
            console.log(data);
          });
          this.router.navigate(["/dashboard"]);
        } else if (response.error) {
          this.toast.show(response.error, { class: "bg-danger" });
        }
      }, (error) => {
        console.error("Login error:", error);
        this.toast.show("An error occurred during login", { class: "bg-danger" });
      });
    }
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 40, vars: 3, consts: [[1, "container", "d-flex", "align-items-center", "justify-content-center", "min-vh-100"], [1, "card", "shadow", "p-4", 2, "width", "400px", "border-radius", "15px"], [1, "text-center", "mb-4"], ["src", "assets/images/svg/logo.svg", "alt", "logo", 2, "width", "60px"], [1, "mt-3"], [1, "d-flex", "justify-content-between", "mb-3"], [1, "btn", "btn-outline-light", "border", "w-100", "me-2"], [1, "fa", "fa-apple", "text-dark"], [1, "fa", "fa-google", "text-danger"], [1, "btn", "btn-outline-light", "border", "w-100"], [1, "fa", "fa-twitter", "text-primary"], [1, "or-container"], [3, "ngSubmit", "formGroup"], [1, "form-group", "mb-3"], ["for", "username", 1, "form-label"], ["type", "text", "id", "username", "formControlName", "username", "placeholder", "Enter your username", 1, "form-control"], ["for", "password", 1, "form-label"], ["type", "password", "id", "password", "formControlName", "password", "placeholder", "Password", 1, "form-control"], [1, "invalid-feedback"], [1, "form-group", "form-check", "mb-3"], ["type", "checkbox", "id", "rememberMe", 1, "form-check-input"], ["for", "rememberMe", 1, "form-check-label"], ["href", "#", 1, "float-end", "text-decoration-none"], ["type", "submit", 1, "btn", "btn-dark", "w-100", "mb-3", 3, "disabled"], [1, "text-center"], [1, "text-decoration-none", 3, "routerLink"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "img", 3);
        \u0275\u0275elementStart(4, "h4", 4);
        \u0275\u0275text(5, "Welcome to Gujarat Uvach");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Please enter your details to sign in.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 5)(9, "button", 6);
        \u0275\u0275element(10, "i", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "button", 6);
        \u0275\u0275element(12, "i", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "button", 9);
        \u0275\u0275element(14, "i", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(15, "span", 11);
        \u0275\u0275elementStart(16, "form", 12);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_16_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(17, "div", 13)(18, "label", 14);
        \u0275\u0275text(19, "Username");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 13)(22, "label", 16);
        \u0275\u0275text(23, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(24, "input", 17);
        \u0275\u0275elementStart(25, "div", 18);
        \u0275\u0275text(26, "Password must be at least 6 characters.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "div", 19);
        \u0275\u0275element(28, "input", 20);
        \u0275\u0275elementStart(29, "label", 21);
        \u0275\u0275text(30, "Remember me");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "a", 22);
        \u0275\u0275text(32, "Forgot password?");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "button", 23);
        \u0275\u0275text(34, "Sign in");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(35, "div", 24)(36, "p");
        \u0275\u0275text(37, "Don't have an account yet? ");
        \u0275\u0275elementStart(38, "a", 25);
        \u0275\u0275text(39, "Sign Up");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(16);
        \u0275\u0275property("formGroup", ctx.loginForm);
        \u0275\u0275advance(17);
        \u0275\u0275property("disabled", ctx.loginForm.invalid);
        \u0275\u0275advance(5);
        \u0275\u0275property("routerLink", "/auth/register");
      }
    }, dependencies: [RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, AsteriskDirective] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\module\\auth\\login\\login.component.ts", lineNumber: 13 });
})();

// src/app/module/auth/login/login-routing.module.ts
var routes = [{
  path: "",
  component: LoginComponent,
  data: {
    title: "Gujarat Uvach | Authentication",
    description: "Login or register to Gujarat Uvach portal for accessing services",
    keywords: "Gujarat Uvach, login, register, authentication, portal",
    robots: "index, follow"
  }
}];
var LoginRoutingModule = class _LoginRoutingModule {
  static {
    this.\u0275fac = function LoginRoutingModule_Factory(t) {
      return new (t || _LoginRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _LoginRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/auth/login/login.module.ts
var LoginModule = class _LoginModule {
  static {
    this.\u0275fac = function LoginModule_Factory(t) {
      return new (t || _LoginModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _LoginModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      LoginRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule
    ] });
  }
};
export {
  LoginModule
};
//# sourceMappingURL=chunk-E45MQL2Z.mjs.map
