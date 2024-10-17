import {
  AuthService
} from "./chunk-2FCY3S33.js";
import "./chunk-BM7BGPBE.js";
import "./chunk-AM4HOOHV.js";
import "./chunk-UHQMXXXD.js";
import {
  CommonModule,
  Router,
  RouterModule,
  RouterOutlet,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement
} from "./chunk-B5FGZX5H.js";

// src/app/module/auth/auth.component.ts
var AuthComponent = class _AuthComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  ngAfterViewInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/dashboard"]);
    }
  }
  static {
    this.\u0275fac = function AuthComponent_Factory(t) {
      return new (t || _AuthComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthComponent, selectors: [["app-auth"]], decls: 1, vars: 0, template: function AuthComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
      }
    }, dependencies: [RouterOutlet] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthComponent, { className: "AuthComponent", filePath: "src\\app\\module\\auth\\auth.component.ts", lineNumber: 10 });
})();

// src/app/module/auth/auth-routing.module.ts
var routes = [
  {
    path: "",
    component: AuthComponent,
    data: {
      title: "Gujarat Uvach | Authentication",
      description: "Login or register to Gujarat Uvach portal for accessing services",
      keywords: "Gujarat Uvach, login, register, authentication, portal",
      robots: "index, follow"
    },
    children: [
      { path: "", pathMatch: "full", redirectTo: "login" },
      { path: "login", loadChildren: () => import("./chunk-STJOFYRA.js").then((m) => m.LoginModule) },
      { path: "register", loadChildren: () => import("./chunk-UJ2DEJDW.js").then((m) => m.RegisterModule) }
    ]
  }
];
var AuthRoutingModule = class _AuthRoutingModule {
  static {
    this.\u0275fac = function AuthRoutingModule_Factory(t) {
      return new (t || _AuthRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/auth/auth.module.ts
var AuthModule = class _AuthModule {
  static {
    this.\u0275fac = function AuthModule_Factory(t) {
      return new (t || _AuthModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule,
      AuthRoutingModule
    ] });
  }
};
export {
  AuthModule
};
//# sourceMappingURL=chunk-7JHOYB42.js.map
