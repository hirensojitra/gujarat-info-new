import {
  UserService
} from "./chunk-BM7BGPBE.js";
import {
  AsteriskDirective,
  SharedModule,
  ToastService
} from "./chunk-TUD4Z2WI.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-63CLPE7A.js";
import "./chunk-QJMPY6Q2.js";
import "./chunk-UHQMXXXD.js";
import {
  CommonModule,
  NgClass,
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
  ɵɵpureFunction1,
  ɵɵtext
} from "./chunk-B5FGZX5H.js";

// src/app/module/auth/register/register.component.ts
var _c0 = (a0) => ({ "is-invalid": a0 });
var RegisterComponent = class _RegisterComponent {
  constructor(fb, userService, router, toast) {
    this.fb = fb;
    this.userService = userService;
    this.router = router;
    this.toast = toast;
    this.registrationForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      roles: ["user"],
      // Default role, adjust as necessary
      emailVerified: [false]
      // Default value
    });
  }
  ngOnInit() {
  }
  // Method to register a user
  register() {
    const pass = this.registrationForm.get("password")?.value;
    if (this.registrationForm.valid) {
      const { username, password, email, emailVerified } = this.registrationForm.value;
      const roles = ["user"];
      this.userService.registerUser(username, password, email, roles, emailVerified).subscribe((response) => {
        response.error ? this.toast.show(response.error, { class: "bg-danger" }) : this.router.navigate(["/auth"]);
      }, (error) => {
        console.error("Error registering user:", error);
      });
    } else {
      this.markFormGroupTouched(this.registrationForm);
    }
    this.registrationForm.get("password")?.setValue(pass);
  }
  // Method to mark form controls as touched for validation feedback
  markFormGroupTouched(formGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  static {
    this.\u0275fac = function RegisterComponent_Factory(t) {
      return new (t || _RegisterComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 35, vars: 9, consts: [[1, "container", "d-flex", "align-items-center", "justify-content-center", "min-vh-100"], [1, "card", "shadow", "p-4", 2, "width", "400px", "border-radius", "15px"], [1, "text-center", "mb-4"], ["src", "assets/images/svg/logo.svg", "alt", "logo", 2, "width", "60px"], [1, "mt-3"], [3, "ngSubmit", "formGroup"], ["type", "hidden", "formControlName", "roles"], [1, "form-group", "mb-3"], ["for", "username", 1, "form-label"], ["type", "text", "id", "username", "formControlName", "username", "placeholder", "Enter your username", 1, "form-control", 3, "ngClass"], [1, "invalid-feedback"], ["for", "email", 1, "form-label"], ["type", "email", "id", "email", "formControlName", "email", "placeholder", "Enter your email", 1, "form-control", 3, "ngClass"], ["for", "password", 1, "form-label"], ["type", "password", "id", "password", "formControlName", "password", "placeholder", "Password", 1, "form-control"], ["type", "submit", 1, "btn", "btn-dark", "w-100", "mb-3", 3, "disabled"], [1, "text-center"], [1, "text-decoration-none", 3, "routerLink"]], template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "img", 3);
        \u0275\u0275elementStart(4, "h4", 4);
        \u0275\u0275text(5, "Create an account");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Please fill in the details to sign up.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "form", 5);
        \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_8_listener() {
          return ctx.register();
        });
        \u0275\u0275element(9, "input", 6);
        \u0275\u0275elementStart(10, "div", 7)(11, "label", 8);
        \u0275\u0275text(12, "Username");
        \u0275\u0275elementEnd();
        \u0275\u0275element(13, "input", 9);
        \u0275\u0275elementStart(14, "div", 10);
        \u0275\u0275text(15, "Username is required.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 7)(17, "label", 11);
        \u0275\u0275text(18, "E-Mail Address");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "input", 12);
        \u0275\u0275elementStart(20, "div", 10);
        \u0275\u0275text(21, "Please enter a valid email.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 7)(23, "label", 13);
        \u0275\u0275text(24, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "input", 14);
        \u0275\u0275elementStart(26, "div", 10);
        \u0275\u0275text(27, "Password must be at least 6 characters long.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "button", 15);
        \u0275\u0275text(29, "Sign Up");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "div", 16)(31, "p");
        \u0275\u0275text(32, "Already have an account? ");
        \u0275\u0275elementStart(33, "a", 17);
        \u0275\u0275text(34, "Sign In");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        \u0275\u0275advance(8);
        \u0275\u0275property("formGroup", ctx.registrationForm);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(5, _c0, ((tmp_1_0 = ctx.registrationForm.get("username")) == null ? null : tmp_1_0.invalid) && ((tmp_1_0 = ctx.registrationForm.get("username")) == null ? null : tmp_1_0.touched)));
        \u0275\u0275advance(6);
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(7, _c0, ((tmp_2_0 = ctx.registrationForm.get("email")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.registrationForm.get("email")) == null ? null : tmp_2_0.touched)));
        \u0275\u0275advance(9);
        \u0275\u0275property("disabled", ctx.registrationForm.invalid);
        \u0275\u0275advance(5);
        \u0275\u0275property("routerLink", "/auth/login");
      }
    }, dependencies: [NgClass, RouterLink, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, AsteriskDirective] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src\\app\\module\\auth\\register\\register.component.ts", lineNumber: 12 });
})();

// src/app/module/auth/register/register-routing.module.ts
var routes = [{
  path: "",
  component: RegisterComponent,
  data: {
    title: "Gujarat Uvach | Register",
    description: "Login or register to Gujarat Uvach portal for accessing services",
    keywords: "Gujarat Uvach, login, register, portal",
    robots: "index, follow",
    image: "https://test-ssr-hiren.netlify.app/assets/images/jpg/register.jpg"
  }
}];
var RegisterRoutingModule = class _RegisterRoutingModule {
  static {
    this.\u0275fac = function RegisterRoutingModule_Factory(t) {
      return new (t || _RegisterRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _RegisterRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/auth/register/register.module.ts
var RegisterModule = class _RegisterModule {
  static {
    this.\u0275fac = function RegisterModule_Factory(t) {
      return new (t || _RegisterModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _RegisterModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RegisterRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule
    ] });
  }
};
export {
  RegisterModule
};
//# sourceMappingURL=chunk-UJ2DEJDW.js.map
