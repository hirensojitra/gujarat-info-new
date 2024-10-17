import {
  CommonModule,
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-B5FGZX5H.js";

// src/app/module/broken-pages/unauthorized/unauthorized.component.ts
var UnauthorizedComponent = class _UnauthorizedComponent {
  static {
    this.\u0275fac = function UnauthorizedComponent_Factory(t) {
      return new (t || _UnauthorizedComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnauthorizedComponent, selectors: [["app-unauthorized"]], decls: 10, vars: 1, consts: [[1, "page-body"], [1, "lock"], [1, "message", "text-center"], [1, "btn", "btn-dark", 3, "routerLink"], [1, "fa", "fa-home", "me-2"]], template: function UnauthorizedComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "Access to this page is restricted");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Please check with the site admin if you believe this is a mistake.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 3);
        \u0275\u0275element(8, "i", 4);
        \u0275\u0275text(9, "Home");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275property("routerLink", "");
      }
    }, dependencies: [RouterLink], styles: ['\n\n.page-body[_ngcontent-%COMP%] {\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background:\n    linear-gradient(\n      to bottom right,\n      #EEE,\n      #AAA);\n}\nh1[_ngcontent-%COMP%] {\n  margin: 40px 0 20px;\n}\n.lock[_ngcontent-%COMP%] {\n  border-radius: 5px;\n  width: 55px;\n  height: 45px;\n  background-color: #333;\n  animation: _ngcontent-%COMP%_dip 1s;\n  animation-delay: 1.5s;\n  position: relative;\n}\n.lock[_ngcontent-%COMP%]::before, .lock[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  border-left: 5px solid #333;\n  height: 20px;\n  width: 15px;\n  left: calc(50% - 12.5px);\n}\n.lock[_ngcontent-%COMP%]::before {\n  top: -30px;\n  border: 5px solid #333;\n  border-bottom-color: transparent;\n  border-radius: 15px 15px 0 0;\n  height: 30px;\n  animation: _ngcontent-%COMP%_lock 2s, _ngcontent-%COMP%_spin 2s;\n}\n.lock[_ngcontent-%COMP%]::after {\n  top: -10px;\n  border-right: 5px solid transparent;\n  animation: _ngcontent-%COMP%_spin 2s;\n}\n@keyframes _ngcontent-%COMP%_lock {\n  0% {\n    top: -45px;\n  }\n  65% {\n    top: -45px;\n  }\n  100% {\n    top: -30px;\n  }\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: scaleX(-1);\n    left: calc(50% - 30px);\n  }\n  65% {\n    transform: scaleX(1);\n    left: calc(50% - 12.5px);\n  }\n}\n@keyframes _ngcontent-%COMP%_dip {\n  0% {\n    transform: translateY(0px);\n  }\n  50% {\n    transform: translateY(10px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n/*# sourceMappingURL=unauthorized.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnauthorizedComponent, { className: "UnauthorizedComponent", filePath: "src\\app\\module\\broken-pages\\unauthorized\\unauthorized.component.ts", lineNumber: 8 });
})();

// src/app/module/broken-pages/unauthorized/unauthorized-routing.module.ts
var routes = [{
  path: "",
  component: UnauthorizedComponent,
  data: {
    title: "Unauthorized Access | Gujarat Uvach",
    description: "You do not have permission to access this page. Please log in or contact support for assistance.",
    keywords: "Gujarat Uvach, unauthorized, access denied, authentication, portal",
    robots: "noindex, nofollow",
    author: "Gujarat Uvach Team",
    themeColor: "#FF5733"
  }
}];
var UnauthorizedRoutingModule = class _UnauthorizedRoutingModule {
  static {
    this.\u0275fac = function UnauthorizedRoutingModule_Factory(t) {
      return new (t || _UnauthorizedRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UnauthorizedRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/module/broken-pages/unauthorized/unauthorized.module.ts
var UnauthorizedModule = class _UnauthorizedModule {
  static {
    this.\u0275fac = function UnauthorizedModule_Factory(t) {
      return new (t || _UnauthorizedModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _UnauthorizedModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      UnauthorizedRoutingModule
    ] });
  }
};
export {
  UnauthorizedModule
};
//# sourceMappingURL=chunk-GCM2QCI4.js.map
