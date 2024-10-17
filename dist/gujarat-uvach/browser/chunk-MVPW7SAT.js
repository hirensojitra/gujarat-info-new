import {
  CommonModule,
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-B5FGZX5H.js";

// src/app/module/user-profile/view-profile/view-profile.component.ts
var ViewProfileComponent = class _ViewProfileComponent {
  static {
    this.\u0275fac = function ViewProfileComponent_Factory(t) {
      return new (t || _ViewProfileComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewProfileComponent, selectors: [["app-view-profile"]], decls: 6, vars: 0, consts: [[1, "card-header", "d-flex", "align-items-center"], [1, "m-0"], ["routerLink", "/user-profile/edit", 1, "btn", "btn-success", "btn-sm", "ms-auto"], [1, "fa", "fa-pencil", "me-2"]], template: function ViewProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h5", 1);
        \u0275\u0275text(2, "Profile Details");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "button", 2);
        \u0275\u0275element(4, "i", 3);
        \u0275\u0275text(5, "Edit");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [RouterLink] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewProfileComponent, { className: "ViewProfileComponent", filePath: "src\\app\\module\\user-profile\\view-profile\\view-profile.component.ts", lineNumber: 8 });
})();

// src/app/module/user-profile/view-profile/view-profile-routing.module.ts
var routes = [{
  path: "",
  component: ViewProfileComponent,
  data: { title: "View", breadcrumb: "View" }
}];
var ViewProfileRoutingModule = class _ViewProfileRoutingModule {
  static {
    this.\u0275fac = function ViewProfileRoutingModule_Factory(t) {
      return new (t || _ViewProfileRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ViewProfileRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/user-profile/view-profile/view-profile.module.ts
var ViewProfileModule = class _ViewProfileModule {
  static {
    this.\u0275fac = function ViewProfileModule_Factory(t) {
      return new (t || _ViewProfileModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ViewProfileModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      ViewProfileRoutingModule
    ] });
  }
};
export {
  ViewProfileModule
};
//# sourceMappingURL=chunk-MVPW7SAT.js.map
