import './polyfills.server.mjs';
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
} from "./chunk-5I3IBUKT.mjs";
import "./chunk-24VIC3GD.mjs";

// src/app/module/admin/users/users.component.ts
var UsersComponent = class _UsersComponent {
  static {
    this.\u0275fac = function UsersComponent_Factory(t) {
      return new (t || _UsersComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsersComponent, selectors: [["app-users"]], decls: 2, vars: 0, template: function UsersComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "p");
        \u0275\u0275text(1, "users works!");
        \u0275\u0275elementEnd();
      }
    } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsersComponent, { className: "UsersComponent", filePath: "src\\app\\module\\admin\\users\\users.component.ts", lineNumber: 8 });
})();

// src/app/module/admin/users/users-routing.module.ts
var routes = [
  {
    path: "",
    component: UsersComponent,
    data: {
      title: "Gujarat Uvach | Authentication",
      description: "Login or register to Gujarat Uvach portal for accessing services",
      keywords: "Gujarat Uvach, login, register, authentication, portal",
      robots: "index, follow"
    }
  }
];
var UsersRoutingModule = class _UsersRoutingModule {
  static {
    this.\u0275fac = function UsersRoutingModule_Factory(t) {
      return new (t || _UsersRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UsersRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/admin/users/users.module.ts
var UsersModule = class _UsersModule {
  static {
    this.\u0275fac = function UsersModule_Factory(t) {
      return new (t || _UsersModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UsersModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      UsersRoutingModule
    ] });
  }
};
export {
  UsersModule
};
//# sourceMappingURL=chunk-NCSJAG5K.mjs.map
