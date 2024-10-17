import './polyfills.server.mjs';
import {
  EmailVerificationComponent
} from "./chunk-2ZI5HQXO.mjs";
import "./chunk-X5USKXOP.mjs";
import "./chunk-BVVXM5P4.mjs";
import {
  CommonModule,
  RouterModule,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-5I3IBUKT.mjs";
import "./chunk-24VIC3GD.mjs";

// src/app/module/email-verification/email-verification-routing.module.ts
var routes = [{
  path: "",
  component: EmailVerificationComponent,
  data: {
    title: "Email Verification | Gujarat Uvach",
    description: "Welcome to the Gujarat Uvach dashboard. Access a variety of services and features designed to enhance your experience.",
    keywords: "Gujarat Uvach, services, dashboard, user portal, features, access",
    robots: "index, follow"
  }
}];
var EmailVerificationRoutingModule = class _EmailVerificationRoutingModule {
  static {
    this.\u0275fac = function EmailVerificationRoutingModule_Factory(t) {
      return new (t || _EmailVerificationRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _EmailVerificationRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/email-verification/email-verification.module.ts
var EmailVerificationModule = class _EmailVerificationModule {
  static {
    this.\u0275fac = function EmailVerificationModule_Factory(t) {
      return new (t || _EmailVerificationModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _EmailVerificationModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      EmailVerificationRoutingModule
    ] });
  }
};
export {
  EmailVerificationModule
};
//# sourceMappingURL=chunk-LOSTL4ZO.mjs.map
