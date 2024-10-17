import './polyfills.server.mjs';
import {
  UserService
} from "./chunk-X5USKXOP.mjs";
import {
  ActivatedRoute,
  NgIf,
  Router,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-5I3IBUKT.mjs";
import {
  __async
} from "./chunk-24VIC3GD.mjs";

// src/app/module/email-verification/email-verification.component.ts
function EmailVerificationComponent_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function EmailVerificationComponent_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.redirectToLogin());
    });
    \u0275\u0275text(1, "Go to Login");
    \u0275\u0275elementEnd();
  }
}
var EmailVerificationComponent = class _EmailVerificationComponent {
  constructor(route, router, userservice) {
    this.route = route;
    this.router = router;
    this.userservice = userservice;
    this.verificationStatus = "Verifying...";
    this.isVerified = false;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.userservice.getUser().subscribe((user) => {
        this.user = user;
      });
      yield this.route.queryParams.subscribe((params) => {
        const token = params["token"];
        const email = params["email"];
        if (token && email) {
          if (this.user && !this.user.emailverified) {
            this.userservice.verifyEmail(token, email).subscribe((response) => {
              if (response.success) {
                this.verificationStatus = "Your email has been successfully verified!";
                if (this.user) {
                  this.user.emailverified = true;
                }
                this.isVerified = true;
                this.userservice.setUser(this.user);
              } else {
                this.verificationStatus = "Email verification failed. The token may be expired or invalid.";
                this.isVerified = false;
              }
            }, (error) => {
              console.error(error);
              this.verificationStatus = "An error occurred while verifying your email. Please try again later.";
              this.isVerified = false;
            });
          } else {
            this.verificationStatus = "Your email has been successfully verified already!";
            this.isVerified = true;
          }
        } else {
          this.verificationStatus = "Invalid verification link.";
        }
      });
    });
  }
  // Optional: Redirect the user after verification
  redirectToLogin() {
    if (this.isVerified) {
      this.router.navigate(["/login"]);
    }
  }
  static {
    this.\u0275fac = function EmailVerificationComponent_Factory(t) {
      return new (t || _EmailVerificationComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(UserService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmailVerificationComponent, selectors: [["app-email-verification"]], decls: 6, vars: 2, consts: [[1, "h-100-vh", "d-flex", "flex-column", "align-items-center", "justify-content-center"], ["class", "btn btn-primary", 3, "click", 4, "ngIf"], [1, "btn", "btn-primary", 3, "click"]], template: function EmailVerificationComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Email Verification");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "p");
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, EmailVerificationComponent_button_5_Template, 2, 0, "button", 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.verificationStatus);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isVerified);
      }
    }, dependencies: [NgIf] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmailVerificationComponent, { className: "EmailVerificationComponent", filePath: "src\\app\\module\\email-verification\\email-verification.component.ts", lineNumber: 11 });
})();

export {
  EmailVerificationComponent
};
//# sourceMappingURL=chunk-2ZI5HQXO.mjs.map
