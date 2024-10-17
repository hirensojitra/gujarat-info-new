import {
  AuthGuard,
  RoleGuard
} from "./chunk-42LY5BMY.js";
import "./chunk-2FCY3S33.js";
import "./chunk-BM7BGPBE.js";
import "./chunk-AM4HOOHV.js";
import "./chunk-QJMPY6Q2.js";
import "./chunk-UHQMXXXD.js";
import {
  CommonModule,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-B5FGZX5H.js";

// src/app/module/admin/admin.component.ts
var AdminComponent = class _AdminComponent {
  static {
    this.\u0275fac = function AdminComponent_Factory(t) {
      return new (t || _AdminComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminComponent, selectors: [["app-admin"]], decls: 2, vars: 0, template: function AdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "p");
        \u0275\u0275text(1, "admin works!");
        \u0275\u0275elementEnd();
      }
    } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminComponent, { className: "AdminComponent", filePath: "src\\app\\module\\admin\\admin.component.ts", lineNumber: 8 });
})();

// src/app/module/admin/admin-routing.module.ts
var routes = [
  {
    path: "",
    component: AdminComponent,
    data: {
      title: "Gujarat Uvach | Admin",
      description: "Login or register to Gujarat Uvach portal for accessing services",
      keywords: "Gujarat Uvach, login, register, authentication, portal",
      robots: "index, follow"
    },
    children: [
      { path: "", pathMatch: "full", redirectTo: "users" },
      { path: "users", loadChildren: () => import("./chunk-FZZ3OEGO.js").then((m) => m.UsersModule), data: { role: ["admin"] }, canActivate: [AuthGuard, RoleGuard] }
    ]
  }
];
var AdminRoutingModule = class _AdminRoutingModule {
  static {
    this.\u0275fac = function AdminRoutingModule_Factory(t) {
      return new (t || _AdminRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AdminRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/admin/admin.module.ts
var AdminModule = class _AdminModule {
  static {
    this.\u0275fac = function AdminModule_Factory(t) {
      return new (t || _AdminModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AdminModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      AdminRoutingModule
    ] });
  }
};
export {
  AdminModule
};
//# sourceMappingURL=chunk-B5E5HLD5.js.map
