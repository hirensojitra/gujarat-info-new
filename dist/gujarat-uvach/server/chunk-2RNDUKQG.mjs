import './polyfills.server.mjs';
import {
  AuthService
} from "./chunk-N3IZ42AQ.mjs";
import "./chunk-XZCEH4RM.mjs";
import {
  UserService
} from "./chunk-X5USKXOP.mjs";
import "./chunk-BVVXM5P4.mjs";
import {
  CommonModule,
  NgIf,
  Router,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
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
  ɵɵtext
} from "./chunk-5I3IBUKT.mjs";
import "./chunk-24VIC3GD.mjs";

// src/app/module/dashboard/dashboard.component.ts
function DashboardComponent_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DashboardComponent_button_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resendVerification());
    });
    \u0275\u0275text(1, "Verify Email");
    \u0275\u0275elementEnd();
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(authService, router, userService) {
    this.authService = authService;
    this.router = router;
    this.userService = userService;
    this.email = "";
    this.message = "";
    this.errorMessage = "";
  }
  ngOnInit() {
    this.userService.getUser().subscribe((data) => {
      this.user = data;
    });
  }
  resendVerification() {
    this.user.email && this.authService.resendVerificationEmail(this.user.email).subscribe((response) => {
      this.message = response.message;
      this.errorMessage = "";
    }, (error) => {
      this.errorMessage = error;
      this.message = "";
    });
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(UserService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 1, vars: 1, consts: [["class", "btn btn-primay", 3, "click", 4, "ngIf"], [1, "btn", "btn-primay", 3, "click"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, DashboardComponent_button_0_Template, 2, 0, "button", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.user && !ctx.user.emailverified);
      }
    }, dependencies: [NgIf] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\module\\dashboard\\dashboard.component.ts", lineNumber: 12 });
})();

// src/app/module/dashboard/dashboard-routing.module.ts
var routes = [{
  path: "",
  component: DashboardComponent,
  data: {
    title: "Dashboard | Gujarat Uvach",
    description: "Welcome to the Gujarat Uvach dashboard. Access a variety of services and features designed to enhance your experience.",
    keywords: "Gujarat Uvach, services, dashboard, user portal, features, access",
    robots: "index, follow"
  }
}];
var DashboardRoutingModule = class _DashboardRoutingModule {
  static {
    this.\u0275fac = function DashboardRoutingModule_Factory(t) {
      return new (t || _DashboardRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/dashboard/dashboard.module.ts
var DashboardModule = class _DashboardModule {
  static {
    this.\u0275fac = function DashboardModule_Factory(t) {
      return new (t || _DashboardModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      DashboardRoutingModule
    ] });
  }
};
export {
  DashboardModule
};
//# sourceMappingURL=chunk-2RNDUKQG.mjs.map
