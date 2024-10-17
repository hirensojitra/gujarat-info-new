import './polyfills.server.mjs';
import {
  AuthGuard,
  RoleGuard
} from "./chunk-6ZU444BG.mjs";
import {
  SEOService
} from "./chunk-PVCDZYMX.mjs";
import {
  BrowserAnimationsModule,
  ServerModule,
  animate,
  state,
  style,
  transition,
  trigger
} from "./chunk-GYG3QIKQ.mjs";
import {
  AuthService
} from "./chunk-N3IZ42AQ.mjs";
import {
  LoaderService
} from "./chunk-XZCEH4RM.mjs";
import {
  SharedModule,
  ToastService
} from "./chunk-EEUSAIS4.mjs";
import {
  UserService
} from "./chunk-X5USKXOP.mjs";
import {
  environment
} from "./chunk-BVVXM5P4.mjs";
import {
  ActivatedRoute,
  AsyncPipe,
  BehaviorSubject,
  BrowserModule,
  CommonModule,
  ElementRef,
  EventEmitter,
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpResponse,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  NgClass,
  NgForOf,
  NgIf,
  NgZone,
  Renderer2,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
  Subject,
  Title,
  finalize,
  provideClientHydration,
  provideHttpClient,
  tap,
  withFetch,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpureFunction1,
  ɵɵpureFunction3,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-5I3IBUKT.mjs";

// src/app/layout/empty-layout/empty-layout.component.ts
var EmptyLayoutComponent = class _EmptyLayoutComponent {
  static {
    this.\u0275fac = function EmptyLayoutComponent_Factory(t) {
      return new (t || _EmptyLayoutComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmptyLayoutComponent, selectors: [["app-empty-layout"]], decls: 1, vars: 0, template: function EmptyLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
      }
    }, dependencies: [RouterOutlet] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmptyLayoutComponent, { className: "EmptyLayoutComponent", filePath: "src\\app\\layout\\empty-layout\\empty-layout.component.ts", lineNumber: 8 });
})();

// src/app/common/services/breadcrumb.ts
var BreadcrumbService = class _BreadcrumbService {
  constructor(activatedRoute, router) {
    this.activatedRoute = activatedRoute;
    this.router = router;
    this.breadcrumbsSubject = new BehaviorSubject([]);
    this.breadcrumbs$ = this.breadcrumbsSubject.asObservable();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.createBreadcrumbs(activatedRoute.snapshot.root);
      }
    });
    this.createBreadcrumbs(activatedRoute.snapshot.root);
  }
  formatPath(path) {
    let updatedPath = path.replace(/^\/+|\/+$/g, "");
    updatedPath = updatedPath.replace(/\/+/g, "/");
    return "/" + updatedPath;
  }
  createBreadcrumbs(routeSnapshot, url = "", breadcrumbs = []) {
    const label = routeSnapshot.data["breadcrumb"];
    const nextUrl = url + `/${routeSnapshot.url.map((segment) => segment.path).join("")}`;
    if (label) {
      breadcrumbs.push({ label, link: this.formatPath(nextUrl) });
    }
    if (routeSnapshot.firstChild) {
      return this.createBreadcrumbs(routeSnapshot.firstChild, nextUrl, breadcrumbs);
    }
    this.breadcrumbsSubject.next(breadcrumbs);
    return breadcrumbs;
  }
  static {
    this.\u0275fac = function BreadcrumbService_Factory(t) {
      return new (t || _BreadcrumbService)(\u0275\u0275inject(ActivatedRoute), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BreadcrumbService, factory: _BreadcrumbService.\u0275fac, providedIn: "root" });
  }
};

// projects/angular-bootstrap-sidebar/src/lib/angular-bootstrap-sidebar.service.ts
var ABSService = class _ABSService {
  constructor(zone) {
    this.zone = zone;
    this.menuToggleSubject = new BehaviorSubject(false);
    this.dirSubject = new BehaviorSubject("");
    setInterval(() => {
      this.zone.run(() => {
        const currentDir = document.documentElement.getAttribute("dir") || "ltr";
        if (this.dirSubject.value !== currentDir) {
          this.dirSubject.next(currentDir);
        }
      });
    }, 1e3);
  }
  setDir(dir) {
    document.documentElement.setAttribute("dir", dir);
    this.dirSubject.next(dir);
  }
  // Modify getDir to return Observable<string>
  getDir() {
    return this.dirSubject.asObservable();
  }
  getMenuStatus() {
    return this.menuToggleSubject.asObservable();
  }
  toggleMenu() {
    this.menuToggleSubject.next(!this.menuToggleSubject.value);
  }
  handleKeyboardEvent(event) {
    if (event.ctrlKey && event.shiftKey && event.key === "S") {
      event.preventDefault();
      this.toggleMenu();
    }
  }
  ngOnDestroy() {
    this.menuToggleSubject.unsubscribe();
    this.dirSubject.unsubscribe();
  }
  static {
    this.\u0275fac = function ABSService_Factory(t) {
      return new (t || _ABSService)(\u0275\u0275inject(NgZone));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ABSService, factory: _ABSService.\u0275fac, providedIn: "root" });
  }
};

// projects/angular-bootstrap-sidebar/src/lib/angular-bootstrap-sidebar.directive.ts
var ABSDirective = class _ABSDirective {
  set menuActive(value) {
    this.menuActiveSubject.next(value);
  }
  set menuHover(value) {
    this.menuHoverSubject.next(value);
  }
  set menuData(value) {
    this.menuDataSubject.next(value);
  }
  constructor(el, renderer, router, absService) {
    this.el = el;
    this.renderer = renderer;
    this.router = router;
    this.absService = absService;
    this.isMenuActive = false;
    this.isMenuHover = false;
    this.menuDataSubject = new Subject();
    this.menuActiveSubject = new Subject();
    this.menuHoverSubject = new Subject();
    this.menuActiveChange = new EventEmitter();
    this.menuActiveSubject.subscribe((isMenuActive) => {
      this.handleMenuActiveChange(isMenuActive);
      this.updateSidebarVisibility();
      this.toggleMenuOpenClass(isMenuActive);
      this.checkActive(this.isMenuActive);
    });
    this.menuHoverSubject.subscribe((isMenuHover) => {
      this.handleMenuHoverChange(isMenuHover);
    });
    this.menuDataSubject.subscribe((menuData) => {
      this.createSidebar(menuData);
      this.checkActive(this.isMenuActive);
    });
  }
  handleMenuActiveChange(isMenuActive) {
    this.isMenuActive = isMenuActive;
  }
  handleMenuHoverChange(isMenuHover) {
    this.isMenuHover = isMenuHover;
  }
  toggleMenuOpenClass(isActive) {
    if (isActive) {
      this.el.nativeElement.classList.add("menu-open");
    } else {
      this.el.nativeElement.classList.remove("menu-open");
    }
  }
  findSiblingListItems(el, className) {
    let items = el.parentElement ? Array.from(el.parentElement.children).filter((child) => child !== el && child.classList.contains(className)) : null;
    return items ? items.forEach((siblingLi) => {
      const siblingLiElement = siblingLi;
      const submenuOfSiblingUls = siblingLiElement.querySelectorAll("ul");
      submenuOfSiblingUls.forEach((submenu) => {
        if (submenu instanceof HTMLElement) {
          submenu.classList.add("collapse");
        }
      });
      const aElements = siblingLiElement.querySelectorAll("a.clicked");
      aElements.forEach((a) => {
        a.classList.remove("clicked");
      });
    }) : false;
  }
  updateSidebarVisibility() {
    const submenuElements = this.el.nativeElement.querySelectorAll(".submenu");
    const clickedElements = this.el.nativeElement.querySelectorAll(".clicked");
    let parentElement = this.el.nativeElement.parentElement;
    while (parentElement) {
      if (parentElement.classList.contains("sidebar")) {
        break;
      }
      parentElement = parentElement.parentElement;
    }
    submenuElements.forEach((ul) => {
      ul.classList.add("collapse");
      if (this.isMenuActive) {
        parentElement.classList.add("menu-open");
      } else {
        parentElement.classList.remove("menu-open");
      }
    });
    clickedElements.forEach((a) => {
      a.classList.remove("clicked");
    });
    const closeMenu = this.el.nativeElement.querySelector(".close-menu");
    closeMenu?.remove();
  }
  checkActive(activate) {
    const navLink = this.el.nativeElement.querySelectorAll(".nav-link");
    navLink.forEach((a) => {
      const href = a.getAttribute("href")?.toString();
      if (href) {
        let link = href.split("/").filter((value) => value !== "");
        link = link.map((value) => {
          const indexOfSpecialChar = value.search(/[^\w\s-]/gi);
          if (indexOfSpecialChar !== -1) {
            return value.substring(0, indexOfSpecialChar);
          }
          return value;
        });
        let currentLink = this.router.url.split("/").filter((value) => value !== "");
        currentLink = currentLink.map((value) => {
          const indexOfSpecialChar = value.search(/[^\w\s-]/gi);
          if (indexOfSpecialChar !== -1) {
            return value.substring(0, indexOfSpecialChar);
          }
          return value;
        });
        const minLength = Math.min(link.length, currentLink.length);
        currentLink = currentLink.slice(0, minLength);
        const areIdentical = JSON.stringify(link) === JSON.stringify(currentLink);
        if (areIdentical) {
          a.classList.add("active");
          if (activate) {
            const parentUl = a.closest("ul");
            if (parentUl) {
              parentUl.classList.remove("collapse");
            }
          }
        } else {
          a.classList.remove("active");
        }
      }
    });
  }
  createSidebar(menuData, parentElement) {
    const ul = this.renderer.createElement("ul");
    menuData.forEach((menuItem) => {
      const li = this.renderer.createElement("li");
      const a = this.renderer.createElement("a");
      li.classList.add("nav-item");
      this.renderer.setAttribute(a, "href", menuItem.link);
      if (this.router.url.includes(menuItem.link)) {
        a.classList.add("active");
      }
      a.setAttribute("routerLinkActive", "current");
      a.setAttribute("title", menuItem.label);
      a.classList.add("nav-link", "text-nowrap", "link");
      const menuItemSpan = this.renderer.createElement("span");
      this.renderer.appendChild(menuItemSpan, this.renderer.createText(menuItem.label));
      if (menuItem.icon) {
        const menuItemIcon = this.renderer.createElement("i");
        this.renderer.addClass(menuItemSpan, "has-icon");
        this.renderer.addClass(menuItemIcon, "fa");
        this.renderer.addClass(menuItemIcon, menuItem.icon);
        this.renderer.appendChild(a, menuItemIcon);
      }
      this.renderer.appendChild(a, menuItemSpan);
      this.renderer.appendChild(li, a);
      if (menuItem.subItems && menuItem.subItems.length > 0) {
        const arrow = this.renderer.createElement("i");
        arrow.classList.add("fa", "fa-angle-down", "control-arrow");
        this.renderer.appendChild(a, arrow);
        a.addEventListener("click", (event) => {
          event.preventDefault();
          const submenuElement = li.querySelector("ul");
          submenuElement.classList.toggle("collapse");
          const closeMenu = this.el.nativeElement.querySelector(".close-menu");
          if (!submenuElement.classList.contains("collapse")) {
            a.classList.add("clicked");
            closeMenu ? closeMenu.remove() : null;
            const closeMenuAdd = this.renderer.createElement("div");
            closeMenuAdd.addEventListener("click", () => {
              const toggleLiSubmenu = li.querySelectorAll("ul");
              toggleLiSubmenu.forEach((submenu) => {
                if (submenu instanceof HTMLElement) {
                  submenu.classList.add("collapse");
                }
              });
              this.updateSidebarVisibility();
              closeMenuAdd.remove();
            });
            closeMenuAdd.classList.add("close-menu");
            this.renderer.appendChild(this.el.nativeElement, closeMenuAdd);
            this.findSiblingListItems(li, "has-submenu");
          } else {
            a.classList.remove("clicked");
            const toggleLiSubmenu = li.querySelectorAll("ul");
            toggleLiSubmenu.forEach((submenu) => {
              if (submenu instanceof HTMLElement) {
                submenu.classList.add("collapse");
              }
            });
          }
          return false;
        });
        a.addEventListener("mouseenter", (event) => {
          if (!this.isMenuActive && this.isMenuHover) {
            const submenuElement = li.querySelector("ul");
            submenuElement.classList.toggle("collapse");
            const closeMenu = this.el.nativeElement.querySelector(".close-menu");
            if (!submenuElement.classList.contains("collapse")) {
              a.classList.add("clicked");
              closeMenu ? closeMenu.remove() : null;
              const closeMenuAdd = this.renderer.createElement("div");
              closeMenuAdd.addEventListener("mouseenter", () => {
                const toggleLiSubmenu = li.querySelectorAll("ul");
                toggleLiSubmenu.forEach((submenu) => {
                  if (submenu instanceof HTMLElement) {
                    submenu.classList.add("collapse");
                  }
                });
                this.updateSidebarVisibility();
                closeMenuAdd.remove();
              });
              closeMenuAdd.classList.add("close-menu");
              this.renderer.appendChild(this.el.nativeElement, closeMenuAdd);
              this.findSiblingListItems(li, "has-submenu");
            } else {
              a.classList.remove("clicked");
              const toggleLiSubmenu = li.querySelectorAll("ul");
              toggleLiSubmenu.forEach((submenu) => {
                if (submenu instanceof HTMLElement) {
                  submenu.classList.add("collapse");
                }
              });
            }
          }
          return false;
        });
        this.createSidebar(menuItem.subItems, li);
        li.classList.add("has-submenu");
      } else {
        a.addEventListener("mouseenter", (event) => {
          !this.isMenuActive && this.isMenuHover ? this.findSiblingListItems(li, "has-submenu") : null;
        });
        a.addEventListener("click", (event) => {
          event.preventDefault();
          const parentLi = a.parentElement;
          const siblings = Array.from(parentLi.parentElement?.children || []);
          siblings.forEach((sibling) => {
            if (sibling !== parentLi) {
              const siblingLink = sibling.querySelector("a");
              if (siblingLink) {
                siblingLink.classList.remove("active");
              }
            }
          });
          this.findSiblingListItems(li, "has-submenu");
          const link = menuItem.link;
          setTimeout(() => {
            this.router.navigate([link]).then(() => {
              this.checkActive();
              const screenWidth = window.innerWidth;
              if (screenWidth < 1200) {
                this.absService.toggleMenu();
              }
            });
            !this.isMenuActive ? this.updateSidebarVisibility() : null;
            a.classList.add("active");
          }, 200);
        });
      }
      this.renderer.appendChild(ul, li);
    });
    const container = parentElement || this.el.nativeElement;
    this.renderer.appendChild(container, ul);
    if (!parentElement) {
      this.el.nativeElement.innerHTML = "";
      const sidebar = this.renderer.createElement("nav");
      this.renderer.appendChild(sidebar, ul);
      ul.classList.add("nav", "flex-column", "align-items-start");
      this.renderer.appendChild(this.el.nativeElement, sidebar);
    } else {
      ul.classList.add("submenu", "list-unstyled", "collapse");
    }
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkActive(this.isMenuActive);
      }
    });
  }
  ngAfterViewInit() {
  }
  static {
    this.\u0275fac = function ABSDirective_Factory(t) {
      return new (t || _ABSDirective)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ABSService));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ABSDirective, selectors: [["", "sidebarMenu", ""]], inputs: { menuActive: "menuActive", menuHover: "menuHover", menuData: "menuData" }, outputs: { menuActiveChange: "menuActiveChange" } });
  }
};

// projects/angular-bootstrap-sidebar/src/lib/angular-bootstrap-sidebar.component.ts
var _c0 = (a0) => ({ "menu-open": a0 });
var _c1 = (a0, a1, a2) => ({ "justify-content-between": a0, "justify-content-start": a1, "justify-content-center": a2 });
var _c2 = (a0) => ({ "d-none": a0 });
function ABSComponent_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function ABSComponent_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.bootstrapAngularSidebarService.toggleMenu());
    });
    \u0275\u0275element(1, "span", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("transform", ctx_r1.menuStatus ? "rotate(-45deg)" : "none");
  }
}
var ABSComponent = class _ABSComponent {
  constructor(bootstrapAngularSidebarService) {
    this.bootstrapAngularSidebarService = bootstrapAngularSidebarService;
    this.bodyClassAdded = false;
    this.menuActiveChange = new EventEmitter();
    this.menuStatus = false;
    this.menuDir = "ltr";
    this.bootstrapAngularSidebarService.getMenuStatus().subscribe((status) => {
      this.menuStatus = status;
    });
    this.bootstrapAngularSidebarService.getDir().subscribe((dir) => {
      this.menuDir = dir;
    });
  }
  handleKeyboardEvent(event) {
    if (event.ctrlKey && event.shiftKey && event.key === "S") {
      event.preventDefault();
      this.bootstrapAngularSidebarService.toggleMenu();
    }
  }
  ngOnInit() {
    document.body.classList.add("sidebar-added");
    this.bodyClassAdded = true;
    this.menuStatusSubscription = this.bootstrapAngularSidebarService.getMenuStatus().subscribe((status) => {
      this.menuStatus = status;
      if (status) {
        document.body.classList.add("menu-open");
      } else {
        document.body.classList.remove("menu-open");
      }
    });
    this.dirSubscription = this.bootstrapAngularSidebarService.getDir().subscribe((dir) => {
      if (dir === "") {
        document.documentElement.setAttribute("dir", "ltr");
      }
      dir = dir || "ltr";
      this.menuDir = dir;
    });
    this.menuActive ? () => {
      this.menuActiveChange.emit(this.menuStatus);
      this.bootstrapAngularSidebarService.toggleMenu();
    } : null;
  }
  ngOnDestroy() {
    if (this.bodyClassAdded) {
      document.body.classList.remove("sidebar-added");
      document.body.classList.remove("menu-open");
      this.bodyClassAdded = false;
    }
  }
  static {
    this.\u0275fac = function ABSComponent_Factory(t) {
      return new (t || _ABSComponent)(\u0275\u0275directiveInject(ABSService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ABSComponent, selectors: [["abs"]], hostBindings: function ABSComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown", function ABSComponent_keydown_HostBindingHandler($event) {
          return ctx.handleKeyboardEvent($event);
        }, false, \u0275\u0275resolveDocument);
      }
    }, inputs: { menuData: "menuData", menuActive: "menuActive", menuHover: "menuHover", toggleOutside: "toggleOutside", logo: "logo", compactLogo: "compactLogo" }, outputs: { menuActiveChange: "menuActiveChange" }, decls: 9, vars: 26, consts: [[3, "ngClass"], [1, "head-block", "d-flex", "align-items-center", 3, "ngClass"], [1, "flex-grow-1", "h-100", "align-items-center", "d-flex"], ["alt", "IION", 1, "menu-img", 3, "src", "ngClass"], ["class", "btn-dark btn menu-toggle d-md-flex d-none", 3, "click", 4, "ngIf"], [1, "btn", "btn-md", "btn-mobile", "ms-3", "btn-outline-light", 3, "click"], [1, "fa", "fa-close"], ["sidebarMenu", "", 1, "sidebar-menu", 3, "menuActiveChange", "menuData", "menuActive", "menuHover", "ngClass"], [1, "btn-dark", "btn", "menu-toggle", "d-md-flex", "d-none", 3, "click"], [1, "fa", "fa-bars"]], template: function ABSComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "img", 3)(4, "img", 3);
        \u0275\u0275template(5, ABSComponent_button_5_Template, 2, 2, "button", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "button", 5);
        \u0275\u0275listener("click", function ABSComponent_Template_button_click_6_listener() {
          return ctx.bootstrapAngularSidebarService.toggleMenu();
        });
        \u0275\u0275element(7, "i", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 7);
        \u0275\u0275twoWayListener("menuActiveChange", function ABSComponent_Template_div_menuActiveChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.menuStatus, $event) || (ctx.menuStatus = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classMapInterpolate1("sidebar ", ctx.menuDir, "");
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(14, _c0, ctx.menuStatus));
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(16, _c1, ctx.menuStatus, !ctx.menuStatus && !ctx.toggleOutside, ctx.toggleOutside));
        \u0275\u0275advance(2);
        \u0275\u0275property("src", ctx.compactLogo, \u0275\u0275sanitizeUrl)("ngClass", \u0275\u0275pureFunction1(20, _c2, ctx.menuStatus));
        \u0275\u0275advance();
        \u0275\u0275property("src", ctx.logo, \u0275\u0275sanitizeUrl)("ngClass", \u0275\u0275pureFunction1(22, _c2, !ctx.menuStatus));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.toggleOutside);
        \u0275\u0275advance(3);
        \u0275\u0275property("menuData", ctx.menuData);
        \u0275\u0275twoWayProperty("menuActive", ctx.menuStatus);
        \u0275\u0275property("menuHover", ctx.menuHover)("ngClass", \u0275\u0275pureFunction1(24, _c0, ctx.menuStatus));
      }
    }, dependencies: [NgClass, NgIf, ABSDirective], styles: ["\n\n@media (min-width: 1200px) {\n    html body.sidebar-added {\n    padding-left: 5rem;\n  }\n    html body.sidebar-added.menu-open {\n    padding-left: 22.857rem;\n  }\n}\n.head-block[_ngcontent-%COMP%] {\n  background: #252b31;\n  padding: 0.571rem 1rem;\n  height: 5rem;\n  border-bottom: 1px solid #666666;\n  border-right: 1px solid #000000;\n}\n.head-block[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%] {\n  background:\n    transparent linear-gradient(\n      0deg,\n      #03C9FC 0%,\n      #5BFCB6 100%) 0% 0% no-repeat padding-box;\n}\n.head-block[_ngcontent-%COMP%]   .menu-img[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 100%;\n}\n.btn-mobile[_ngcontent-%COMP%] {\n  display: block;\n}\n.sidebar.ltr[_ngcontent-%COMP%] {\n  position: fixed;\n  overflow: visible;\n  display: flex;\n  flex-direction: column;\n  z-index: 0;\n  width: 5rem;\n  top: 0;\n  left: -22.857rem;\n  height: 100%;\n  background: #252b31;\n  z-index: 999;\n}\n.sidebar.ltr.menu-open[_ngcontent-%COMP%] {\n  width: 22.857rem;\n  left: 0;\n  max-width: 100%;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  overflow-x: hidden;\n  background: #252b31;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%] {\n  padding: 0.625rem;\n  width: 100%;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  position: relative;\n  width: 100%;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  border-radius: 0.438rem;\n  border: 1px solid #252b31;\n  font-size: 1rem;\n  line-height: 1.3;\n  padding: 0.771rem 1.017rem !important;\n  font-weight: 300;\n  display: block;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  align-items: center;\n  color: #FFFFFF;\n  position: relative;\n  cursor: pointer;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {\n  border-color: #FFFFFF;\n  opacity: 1;\n  font-weight: 300;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link.clicked[_ngcontent-%COMP%] {\n  background: #000000;\n  color: #FFFFFF;\n  opacity: 1;\n  font-weight: 300;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\n  background: #408253;\n  color: #FFFFFF;\n  border-color: #408253;\n  opacity: 1;\n  font-weight: 300;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  height: 1.357rem;\n  width: 1.357rem;\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 1.25rem;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:before {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  width: 100%;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   i.control-arrow[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.571rem;\n  top: calc(50% - 0.5rem);\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-block;\n  vertical-align: middle;\n  max-width: 100%;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   span.has-icon[_ngcontent-%COMP%] {\n  margin-left: 1rem;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%] {\n  display: none;\n  background: #252b31;\n  min-height: 100%;\n  padding: 0.325rem 0 0.325rem 2.2rem;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]:not(.collapse) {\n  display: block;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]    > .nav-item[_ngcontent-%COMP%] {\n  margin-bottom: 0.625rem;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open) {\n  overflow: visible;\n  overflow-x: visible;\n  position: relative;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .close-menu[_ngcontent-%COMP%] {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  background: rgba(0, 0, 0, 0.2);\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .nav[_ngcontent-%COMP%]    > .nav-item[_ngcontent-%COMP%]    > .nav-link[_ngcontent-%COMP%] {\n  display: block;\n  text-align: center;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .nav[_ngcontent-%COMP%]    > .nav-item[_ngcontent-%COMP%]    > .nav-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: none;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .nav[_ngcontent-%COMP%]    > .nav-item[_ngcontent-%COMP%]    > .nav-link[_ngcontent-%COMP%]   .control-arrow[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  display: none;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .nav[_ngcontent-%COMP%]    > .nav-item.has-submenu[_ngcontent-%COMP%] {\n  position: relative;\n}\n.sidebar.ltr[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .nav[_ngcontent-%COMP%]    > .nav-item.has-submenu[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]:not(.collapse) {\n  position: absolute;\n  top: -0.571rem;\n  left: calc(100% + 0.571rem);\n  display: block;\n  width: 22.857rem;\n  padding: 0.571rem 0.625rem !important;\n}\n.sidebar.rtl[_ngcontent-%COMP%] {\n  position: fixed;\n  overflow: visible;\n  display: flex;\n  flex-direction: column;\n  z-index: 0;\n  width: 5rem;\n  top: 0;\n  right: 0;\n  height: 100%;\n  background: #FFFFFF;\n  z-index: 1;\n}\n.sidebar.rtl.menu-open[_ngcontent-%COMP%] {\n  width: 22.857rem;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  overflow-x: hidden;\n  background: #252b31;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%] {\n  padding: 0.625rem;\n  width: 100%;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  position: relative;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  border-radius: 0.438rem;\n  border: 1px solid #FFFFFF;\n  font-size: 1rem;\n  line-height: 1;\n  padding: 0.771rem 1.017rem !important;\n  font-weight: 300;\n  opacity: 0.8;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {\n  border-color: #000000;\n  opacity: 1;\n  font-weight: 300;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link.clicked[_ngcontent-%COMP%] {\n  background: #000000;\n  color: #FFFFFF;\n  opacity: 1;\n  font-weight: 300;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\n  background: #FFFFFF;\n  color: #0CCEF6;\n  border-color: #0CCEF6;\n  opacity: 1;\n  font-weight: 300;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  height: 1.357rem;\n  width: 1.357rem;\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 1.25rem;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:before {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  width: 100%;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]    > .nav-item[_ngcontent-%COMP%] {\n  margin-bottom: 0.625rem;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open) {\n  overflow: visible;\n  overflow-x: visible;\n  position: relative;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .close-menu[_ngcontent-%COMP%] {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  right: 0;\n  z-index: -1;\n  background: rgba(0, 0, 0, 0.2);\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .nav[_ngcontent-%COMP%]    > .nav-item[_ngcontent-%COMP%]    > .nav-link[_ngcontent-%COMP%] {\n  display: block;\n  text-align: center;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .nav[_ngcontent-%COMP%]    > .nav-item[_ngcontent-%COMP%]    > .nav-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: none;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .nav[_ngcontent-%COMP%]    > .nav-item[_ngcontent-%COMP%]    > .nav-link[_ngcontent-%COMP%]   .control-arrow[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  display: none;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .nav[_ngcontent-%COMP%]    > .nav-item.has-submenu[_ngcontent-%COMP%] {\n  position: relative;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .nav[_ngcontent-%COMP%]    > .nav-item.has-submenu[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]:not(.collapse) {\n  position: absolute;\n  top: -0.571rem;\n  right: calc(100% + 0.571rem);\n  display: block;\n  width: 22.857rem;\n  padding: 0.571rem 0.625rem !important;\n}\n.sidebar.rtl[_ngcontent-%COMP%]   .sidebar-menu[_ngcontent-%COMP%]:not(.menu-open)   .nav[_ngcontent-%COMP%]    > .nav-item.has-submenu[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]:not(.collapse)   .nav-item[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n@media (min-width: 1200px) {\n  .btn-mobile[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .sidebar.ltr[_ngcontent-%COMP%] {\n    top: 0;\n    left: 0;\n    height: 100%;\n  }\n  .sidebar.menu-open[_ngcontent-%COMP%] {\n    width: 22.857rem;\n  }\n}\n/*# sourceMappingURL=angular-bootstrap-sidebar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ABSComponent, { className: "ABSComponent", filePath: "projects\\angular-bootstrap-sidebar\\src\\lib\\angular-bootstrap-sidebar.component.ts", lineNumber: 19 });
})();

// projects/angular-bootstrap-sidebar/src/lib/angular-bootstrap-sidebar.module.ts
var AngularBootstrapSidebar = class _AngularBootstrapSidebar {
  static {
    this.\u0275fac = function AngularBootstrapSidebar_Factory(t) {
      return new (t || _AngularBootstrapSidebar)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AngularBootstrapSidebar });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule] });
  }
};

// src/app/common/component/header/header.component.ts
function HeaderComponent_small_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.user.email);
  }
}
var HeaderComponent = class _HeaderComponent {
  constructor(breadcrumbService, ABSService2, authService, US) {
    this.breadcrumbService = breadcrumbService;
    this.ABSService = ABSService2;
    this.authService = authService;
    this.US = US;
    this.menuStatus = false;
    this.menu = [];
    this.originalMenu = [
      {
        label: "Dashboard",
        icon: "fa-tachometer",
        link: "/dashboard"
      },
      {
        label: "Admin",
        icon: "fa-users",
        link: "/admin",
        role: ["admin"],
        subItems: [{
          label: "Users",
          link: "/admin/users"
        }]
      },
      {
        label: "User Profile",
        icon: "fa-user",
        link: "/user-profile"
      },
      {
        label: "Images",
        icon: "fa-image",
        link: "/img",
        role: ["admin"]
      },
      {
        label: "User Images",
        icon: "fa-image",
        link: "/user-img"
      }
    ];
    this.breadcrumbs = [];
    this.userFullName = "User Name";
    this.apiUrl = environment.MasterApi + "/auth/profile-image/";
    this.imageUrl = "";
    this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
    if (this.menuStatus == true) {
      ABSService2.toggleMenu();
      this.menuStatus = ABSService2.getMenuStatus();
    }
  }
  toggleMenu() {
    this.ABSService.toggleMenu();
    this.menuStatus = this.ABSService.getMenuStatus();
  }
  logout() {
    this.authService.logout();
  }
  validateImage(username) {
    const randomParam = `?v=${(/* @__PURE__ */ new Date()).getTime()}&quality=10`;
    const imageUrl = username ? `${this.apiUrl + username}${randomParam}` : `https://dummyimage.com/300x300/F4F4F4/000000&text=${this.imageText()}`;
    this.imageUrl = imageUrl;
  }
  imageText() {
    if (this.user && this.user["firstname"] && this.user["lastname"]) {
      const firstCharFirstName = this.user["firstname"].charAt(0);
      const firstCharLastName = this.user["lastname"].charAt(0);
      return `${firstCharFirstName}${firstCharLastName}`;
    } else {
      return "USER";
    }
  }
  ngOnInit() {
    this.userSubscription = this.US.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.validateImage(this.user.username);
        this.filterMenuByRole();
        this.userFullName = this.US.getFullName();
      }
    });
  }
  isAdmin() {
    return this.authService.hasRole(["admin"]);
  }
  isUser() {
    return this.authService.hasRole(["user"]);
  }
  // Filter the menu based on the user's role
  filterMenuByRole() {
    if (this.user && this.user.roles) {
      this.menu = this.originalMenu.filter((menuItem) => {
        if (menuItem.role && menuItem.role.length > 0) {
          if (menuItem.role.includes("admin") && this.isAdmin()) {
            return true;
          }
          if (menuItem.role.includes("user") && this.isUser()) {
            return true;
          }
          return false;
        }
        return true;
      });
    }
  }
  static {
    this.\u0275fac = function HeaderComponent_Factory(t) {
      return new (t || _HeaderComponent)(\u0275\u0275directiveInject(BreadcrumbService), \u0275\u0275directiveInject(ABSService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(UserService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["main-header"]], decls: 33, vars: 14, consts: [[1, "header-container", "d-flex", "flex-md-row"], [3, "menuData", "menuHover", "toggleOutside", "logo", "compactLogo"], ["aria-label", "Menu", 1, "btn", "btn-primary", "menu-toggle", "m-0", 3, "click"], [1, "fa", "fa-bars"], [1, "h4", "my-0", "mx-auto"], [1, "d-flex", "align-items-center"], [1, "btn", "notification", "me-4", "p-0"], [1, "fa", "fa-bell-o"], [1, "badge", "bg-danger"], [1, "dropdown", "border-start"], ["href", "#", "role", "button", "id", "userDropdown", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "btn", "dropdown-toggle", "py-0"], [1, "img-thumbnail", "rounded-circle", "p-0", 3, "src", "alt"], [1, "d-none", "d-md-block"], ["aria-labelledby", "userDropdown", 1, "dropdown-menu", "dropdown-menu-end", "pb-0", "pt-md-2"], [1, "d-block", "d-md-none"], [1, "dropdown-item", "fw-bold"], ["class", "d-block fw-normal", 4, "ngIf"], [1, "d-block", "d-md-none", "p-0"], [1, "dropdown-divider", "mb-0"], ["routerLink", "/user-profile/view", 1, "dropdown-item", "border-bottom"], ["href", "#", 1, "dropdown-item", "border-bottom", "btn"], ["href", "#", 1, "dropdown-item", "border-bottom", "btn", 3, "click"], [1, "d-block", "fw-normal"]], template: function HeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "abs", 1);
        \u0275\u0275elementStart(2, "button", 2);
        \u0275\u0275listener("click", function HeaderComponent_Template_button_click_2_listener() {
          return ctx.toggleMenu();
        });
        \u0275\u0275element(3, "span", 3);
        \u0275\u0275pipe(4, "async");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 4);
        \u0275\u0275text(6, "Village Directory");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5)(8, "div", 6);
        \u0275\u0275element(9, "i", 7);
        \u0275\u0275elementStart(10, "span", 8);
        \u0275\u0275text(11, "5");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 9)(13, "a", 10);
        \u0275\u0275element(14, "img", 11);
        \u0275\u0275elementStart(15, "span", 12);
        \u0275\u0275text(16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "ul", 13)(18, "li", 14)(19, "span", 15);
        \u0275\u0275text(20);
        \u0275\u0275template(21, HeaderComponent_small_21_Template, 2, 1, "small", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "li", 17);
        \u0275\u0275element(23, "hr", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "li")(25, "a", 19);
        \u0275\u0275text(26, "Profile");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "li")(28, "a", 20);
        \u0275\u0275text(29, "Settings");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "li")(31, "a", 21);
        \u0275\u0275listener("click", function HeaderComponent_Template_a_click_31_listener() {
          ctx.logout();
          return false;
        });
        \u0275\u0275text(32, "Logout");
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("menuData", ctx.menu)("menuHover", true)("toggleOutside", true)("logo", "assets/images/svg/logo.svg")("compactLogo", "assets/images/svg/logo.svg");
        \u0275\u0275advance(2);
        \u0275\u0275styleProp("transform", \u0275\u0275pipeBind1(4, 12, ctx.menuStatus) ? "rotate(-45deg)" : "none");
        \u0275\u0275advance(11);
        \u0275\u0275propertyInterpolate("alt", ctx.user["firstname"]);
        \u0275\u0275property("src", ctx.imageUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.userFullName || "User Name");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.userFullName || "User Name", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.user.email);
      }
    }, dependencies: [NgIf, RouterLink, ABSComponent, AsyncPipe], styles: ["\n\n.breadcrumbs[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  color: #000000;\n  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);\n  z-index: 1;\n  position: relative;\n}\n.breadcrumbs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  font-weight: 500;\n  line-height: 1.7rem;\n  color: #252b31;\n  text-decoration: none;\n}\n.breadcrumbs[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 500;\n  line-height: 1.7rem;\n  color: #696e74;\n}\n.header-container[_ngcontent-%COMP%] {\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  height: 5rem;\n  border-bottom: 0.071rem solid #DEE2E6;\n  background: #408253;\n  color: #FFF;\n}\n.header-container[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%] {\n  height: 3.286rem;\n  width: 3.286rem;\n  font-size: 1.714rem;\n  background: #408253;\n  border-color: #6baf7e;\n  outline: none;\n  box-shadow: none;\n  margin: auto;\n}\n.header-container[_ngcontent-%COMP%]   .dropdown[_ngcontent-%COMP%] {\n  color: #FFFFFF;\n}\n.header-container[_ngcontent-%COMP%]   .dropdown[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%] {\n  box-shadow: none;\n  outline: none;\n  display: flex;\n  align-items: center;\n  color: #FFFFFF;\n}\n.header-container[_ngcontent-%COMP%]   .dropdown[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n  height: 3rem;\n  width: 3rem;\n}\n.header-container[_ngcontent-%COMP%]   .notification[_ngcontent-%COMP%], .header-container[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%] {\n  position: relative;\n  font-size: 1.5rem;\n  color: #FFFFFF;\n}\n.header-container[_ngcontent-%COMP%]   .notification[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%], .header-container[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 0.35em;\n  height: 1rem;\n  width: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 1rem;\n  border-radius: 50%;\n  font-size: 0.8rem;\n}\n@media (max-width: 767px) {\n  .breadcrumbs[_ngcontent-%COMP%] {\n    display: flex;\n  }\n  .breadcrumbs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    line-height: 1.5rem;\n    display: flex;\n    align-items: center;\n  }\n  .breadcrumbs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    color: #408253;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    flex-grow: 1;\n  }\n  .breadcrumbs[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    line-height: 1.5rem;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n  }\n}\n/*# sourceMappingURL=header.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src\\app\\common\\component\\header\\header.component.ts", lineNumber: 24 });
})();

// src/app/layout/dashboard-layout/dashboard-layout.component.ts
function DashboardLayoutComponent_router_outlet_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "router-outlet");
  }
}
var DashboardLayoutComponent = class _DashboardLayoutComponent {
  constructor(authService, router, userService) {
    this.authService = authService;
    this.router = router;
    this.userService = userService;
    this.username = null;
    this.name = null;
  }
  ngOnInit() {
    this.userSubscription = this.userService.getUser().subscribe((user) => {
      this.username = user?.username || null;
      this.name = this.userService.getFullName();
    });
  }
  ngOnDestroy() {
  }
  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  login() {
    this.router.navigate(["/auth/login"]);
  }
  logout() {
    this.authService.logout();
  }
  static {
    this.\u0275fac = function DashboardLayoutComponent_Factory(t) {
      return new (t || _DashboardLayoutComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(UserService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardLayoutComponent, selectors: [["app-dashboard-layout"]], decls: 5, vars: 1, consts: [[1, "vh-100", "d-flex", "flex-column"], [1, "d-flex", "flex-column", "flex-grow-1"], [1, "h-100"], [4, "ngIf"]], template: function DashboardLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "main-header");
        \u0275\u0275elementStart(2, "div", 1)(3, "div", 2);
        \u0275\u0275template(4, DashboardLayoutComponent_router_outlet_4_Template, 1, 0, "router-outlet", 3);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", true);
      }
    }, dependencies: [NgIf, RouterOutlet, HeaderComponent] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardLayoutComponent, { className: "DashboardLayoutComponent", filePath: "src\\app\\layout\\dashboard-layout\\dashboard-layout.component.ts", lineNumber: 13 });
})();

// src/app/layout/layout.component.ts
function LayoutComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "app-dashboard-layout");
    \u0275\u0275elementEnd();
  }
}
function LayoutComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "app-empty-layout");
    \u0275\u0275elementEnd();
  }
}
var LayoutComponent = class _LayoutComponent {
  constructor(activatedRoute) {
    this.activatedRoute = activatedRoute;
    this.currentLayout = "dashboard-layout";
  }
  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.currentLayout = data["layout"] || "empty";
    });
  }
  static {
    this.\u0275fac = function LayoutComponent_Factory(t) {
      return new (t || _LayoutComponent)(\u0275\u0275directiveInject(ActivatedRoute));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LayoutComponent, selectors: [["app-layout"]], decls: 2, vars: 2, consts: [[4, "ngIf"]], template: function LayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, LayoutComponent_div_0_Template, 2, 0, "div", 0)(1, LayoutComponent_div_1_Template, 2, 0, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.currentLayout === "dashboard-layout");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.currentLayout === "empty-layout");
      }
    }, dependencies: [NgIf, EmptyLayoutComponent, DashboardLayoutComponent] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LayoutComponent, { className: "LayoutComponent", filePath: "src\\app\\layout\\layout.component.ts", lineNumber: 10 });
})();

// src/app/app-routing.module.ts
var routes = [
  // Route for dashboard-layout
  {
    path: "dashboard",
    component: LayoutComponent,
    data: { layout: "dashboard-layout" },
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import("./chunk-2RNDUKQG.mjs").then((m) => m.DashboardModule)
      }
    ]
  },
  {
    path: "img",
    component: LayoutComponent,
    data: { layout: "dashboard-layout", role: ["admin"] },
    canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: "",
        loadChildren: () => import("./chunk-B4FYY2K5.mjs").then((m) => m.ImgModule)
      }
    ]
  },
  {
    path: "user-img",
    component: LayoutComponent,
    data: { layout: "dashboard-layout" },
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import("./chunk-BOMOJ23I.mjs").then((m) => m.UserImgModule)
      }
    ]
  },
  {
    path: "admin",
    component: LayoutComponent,
    data: { layout: "dashboard-layout" },
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import("./chunk-VAMXGOIM.mjs").then((m) => m.AdminModule)
      }
    ]
  },
  {
    path: "poster/:img",
    component: LayoutComponent,
    data: { layout: "empty-layout" },
    children: [
      {
        path: "",
        loadChildren: () => import("./chunk-J6Y4SSUP.mjs").then((m) => m.PosterModule)
      }
    ]
  },
  {
    path: "user-profile",
    component: LayoutComponent,
    data: { layout: "dashboard-layout" },
    canActivate: [AuthGuard],
    children: [
      { path: "", loadChildren: () => import("./chunk-PNIW46KN.mjs").then((m) => m.UserProfileModule) }
    ]
  },
  // Route for empty-layout (auth-related)
  {
    path: "auth",
    component: LayoutComponent,
    data: { layout: "empty-layout" },
    children: [
      { path: "", loadChildren: () => import("./chunk-GNZU2ZQC.mjs").then((m) => m.AuthModule) }
    ]
  },
  // About Us
  {
    path: "about-us",
    component: LayoutComponent,
    data: { layout: "empty-layout" },
    children: [
      { path: "", loadChildren: () => import("./chunk-V3OA2DY6.mjs").then((m) => m.AboutUsModule) }
    ]
  },
  {
    path: "verify-email",
    component: LayoutComponent,
    data: { layout: "empty-layout" },
    children: [
      { path: "", loadChildren: () => import("./chunk-LOSTL4ZO.mjs").then((m) => m.EmailVerificationModule) }
    ]
  },
  {
    path: "broken-pages",
    component: LayoutComponent,
    data: { layout: "empty-layout" },
    children: [
      { path: "", pathMatch: "full", redirectTo: "unauthorized" },
      { path: "unauthorized", loadChildren: () => import("./chunk-R67Y2IOU.mjs").then((m) => m.UnauthorizedModule) }
    ]
  },
  // Redirect unmatched paths to auth
  {
    path: "**",
    redirectTo: "auth/login",
    pathMatch: "full"
  }
];
var AppRoutingModule = class _AppRoutingModule {
  static {
    this.\u0275fac = function AppRoutingModule_Factory(t) {
      return new (t || _AppRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forRoot(routes, {
      initialNavigation: "enabledBlocking",
      urlUpdateStrategy: "deferred"
    }), RouterModule] });
  }
};

// src/app/common/component/loader/loader.component.ts
var _c02 = (a0) => ({ "trans show": a0 });
var LoaderComponent = class _LoaderComponent {
  constructor(loaderService, titleService) {
    this.loaderService = loaderService;
    this.titleService = titleService;
    this.title = this.loaderService.getTitle();
    this.setTitle(this.title);
  }
  setTitle(newTitle) {
    this.titleService.setTitle(newTitle);
  }
  static {
    this.\u0275fac = function LoaderComponent_Factory(t) {
      return new (t || _LoaderComponent)(\u0275\u0275directiveInject(LoaderService), \u0275\u0275directiveInject(Title));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoaderComponent, selectors: [["app-loader"]], decls: 5, vars: 5, consts: [[1, "loader-container", 3, "ngClass"], ["src", "assets/images/svg/logo.svg", "alt", "", 2, "max-width", "60px"], [1, "loader-box"]], template: function LoaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275pipe(1, "async");
        \u0275\u0275elementStart(2, "p");
        \u0275\u0275element(3, "img", 1);
        \u0275\u0275elementEnd();
        \u0275\u0275element(4, "div", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(3, _c02, \u0275\u0275pipeBind1(1, 1, ctx.loaderService.showLoaderTrans$)));
      }
    }, dependencies: [NgClass, AsyncPipe], styles: ["\n\n.loader-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  flex-direction: column;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background:\n    linear-gradient(\n      120deg,\n      #6a4ee1 0%,\n      #05bdd7 100%) !important;\n  z-index: 99999999;\n  pointer-events: none;\n}\n.loader-container.trans[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      rgba(106, 78, 225, 0.8) 0%,\n      rgba(5, 189, 215, 0.8) 100%) !important;\n}\n.loader-container.show[_ngcontent-%COMP%] {\n  pointer-events: all;\n}\np[_ngcontent-%COMP%] {\n  color: #000000;\n  margin-top: auto;\n  margin-bottom: 40px;\n  font-size: 20px;\n  font-weight: 600;\n}\n.loader-box[_ngcontent-%COMP%] {\n  margin-bottom: auto;\n  border: 4px solid #000000;\n  border-top: 4px solid #FFFFFF;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=loader.component.css.map */"], data: { animation: [
      trigger("fadeInOut", [
        state("true", style({ opacity: 1, height: "100%" })),
        state("false", style({ opacity: 0, height: 0 })),
        transition("false => true", animate("0ms ease-in")),
        transition("true => false", animate("100ms ease-in-out"))
      ])
    ] } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoaderComponent, { className: "LoaderComponent", filePath: "src\\app\\common\\component\\loader\\loader.component.ts", lineNumber: 19 });
})();

// src/app/common/component/toast/toast.component.ts
function ToastComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "strong", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 6);
    \u0275\u0275listener("click", function ToastComponent_div_2_Template_button_click_6_listener() {
      const i_r2 = \u0275\u0275restoreView(_r1).index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeToast(i_r2));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 7);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const toast_r4 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleMap("margin-bottom:" + (i_r2 === ctx_r2.toastService.toasts.length - 1 ? "0" : "1rem"));
    \u0275\u0275classMap(toast_r4.class || "bg-primary");
    \u0275\u0275classProp("show", toast_r4.show);
    \u0275\u0275property("@toastAnimation", void 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(toast_r4.title || "Notification");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(toast_r4.time || "Now");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(toast_r4.message);
  }
}
var ToastComponent = class _ToastComponent {
  constructor(toastService) {
    this.toastService = toastService;
  }
  removeToast(index) {
    this.toastService.toasts.splice(index, 1);
  }
  static {
    this.\u0275fac = function ToastComponent_Factory(t) {
      return new (t || _ToastComponent)(\u0275\u0275directiveInject(ToastService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToastComponent, selectors: [["app-toast"]], decls: 3, vars: 1, consts: [[1, "position-relative"], [1, "position-fixed", "bottom-0", "end-0", "p-3"], ["class", "toast", "role", "alert", "aria-live", "assertive", "aria-atomic", "true", 3, "class", "show", "style", 4, "ngFor", "ngForOf"], ["role", "alert", "aria-live", "assertive", "aria-atomic", "true", 1, "toast"], [1, "toast-header"], [1, "me-auto"], ["type", "button", "data-bs-dismiss", "toast", "aria-label", "Close", 1, "btn-close", 3, "click"], [1, "toast-body"]], template: function ToastComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275template(2, ToastComponent_div_2_Template, 9, 10, "div", 2);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.toastService.toasts);
      }
    }, dependencies: [NgForOf], styles: ["\n\n.toast[_ngcontent-%COMP%] {\n  color: #fff;\n  min-width: 320px;\n  border-radius: 0.5rem;\n  overflow: hidden;\n  z-index: 999 !important;\n}\n/*# sourceMappingURL=toast.component.css.map */"], data: { animation: [
      trigger("toastAnimation", [
        state("void", style({ transform: "translateY(100%)", opacity: 0 })),
        state("*", style({ transform: "translateY(0)", opacity: 1 })),
        transition(":enter", [
          style({ transform: "translateY(100%)", opacity: 0 }),
          animate("300ms ease-out")
        ]),
        transition(":leave", [
          animate("300ms ease-in", style({ transform: "translateY(100%)", opacity: 0 }))
        ])
      ])
    ] } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToastComponent, { className: "ToastComponent", filePath: "src\\app\\common\\component\\toast\\toast.component.ts", lineNumber: 26 });
})();

// src/app/app.component.ts
var _c03 = (a0) => ({ "show": a0 });
var AppComponent = class _AppComponent {
  constructor(seoService, loaderService, router) {
    this.seoService = seoService;
    this.loaderService = loaderService;
    this.router = router;
  }
  ngOnInit() {
    this.seoService.initSEO();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show(0);
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loaderService.hide();
      }
    });
  }
  static {
    this.\u0275fac = function AppComponent_Factory(t) {
      return new (t || _AppComponent)(\u0275\u0275directiveInject(SEOService), \u0275\u0275directiveInject(LoaderService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 8, vars: 9, consts: [[1, "toast-container"], [1, "loader-container", 3, "ngClass"]], template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
        \u0275\u0275elementStart(1, "div", 0);
        \u0275\u0275element(2, "app-toast");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1);
        \u0275\u0275pipe(4, "async");
        \u0275\u0275elementStart(5, "app-loader");
        \u0275\u0275pipe(6, "async");
        \u0275\u0275text(7);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(7, _c03, \u0275\u0275pipeBind1(4, 3, ctx.loaderService.showLoader$)));
        \u0275\u0275advance(2);
        \u0275\u0275property("@fadeInOut", \u0275\u0275pipeBind1(6, 5, ctx.loaderService.showLoader$));
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.loaderService.getTitle());
      }
    }, dependencies: [NgClass, RouterOutlet, LoaderComponent, ToastComponent, AsyncPipe], styles: ["\n\n.toast-container[_ngcontent-%COMP%] {\n  z-index: 99999;\n}\n.loader-container[_ngcontent-%COMP%] {\n  z-index: 9999;\n  position: relative;\n  pointer-events: none;\n}\n.loader-container.show[_ngcontent-%COMP%] {\n  pointer-events: all;\n}\n/*# sourceMappingURL=app.component.css.map */"], data: { animation: [
      trigger("fadeInOut", [
        state("true", style({ opacity: 1, height: "100%" })),
        state("false", style({ opacity: 0, height: 0 })),
        transition("false => true", animate("0ms ease-in")),
        transition("true => false", animate("100ms ease-in-out"))
      ])
    ] } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 20 });
})();

// src/app/layout/empty-layout/empty-layout.module.ts
var EmptyLayoutModule = class _EmptyLayoutModule {
  static {
    this.\u0275fac = function EmptyLayoutModule_Factory(t) {
      return new (t || _EmptyLayoutModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _EmptyLayoutModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule
    ] });
  }
};

// src/app/common/component/header/header.module.ts
var HeaderModule = class _HeaderModule {
  static {
    this.\u0275fac = function HeaderModule_Factory(t) {
      return new (t || _HeaderModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _HeaderModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule,
      SharedModule,
      AngularBootstrapSidebar
    ] });
  }
};

// src/app/layout/dashboard-layout/dashboard-layout.module.ts
var DashboardLayoutModule = class _DashboardLayoutModule {
  static {
    this.\u0275fac = function DashboardLayoutModule_Factory(t) {
      return new (t || _DashboardLayoutModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardLayoutModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule,
      HeaderModule
    ] });
  }
};

// src/app/layout/layout.module.ts
var LayoutModule = class _LayoutModule {
  static {
    this.\u0275fac = function LayoutModule_Factory(t) {
      return new (t || _LayoutModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _LayoutModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      EmptyLayoutModule,
      DashboardLayoutModule,
      RouterModule
    ] });
  }
};

// src/app/common/component/loader/loader.module.ts
var LoaderModule = class _LoaderModule {
  static {
    this.\u0275fac = function LoaderModule_Factory(t) {
      return new (t || _LoaderModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _LoaderModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule] });
  }
};

// src/app/common/interceptor/http-loader.interceptor.ts
var HttpLoaderInterceptor = class _HttpLoaderInterceptor {
  constructor(loaderService) {
    this.loaderService = loaderService;
    this.activeRequests = 0;
    this.pendingRequests = 0;
  }
  intercept(request, next) {
    if (this.isExcludedUrl(request.url)) {
      return next.handle(request);
    }
    if (this.pendingRequests === 0) {
      this.loaderService.show(1);
    } else {
      this.loaderService.hide();
    }
    this.pendingRequests++;
    return next.handle(request).pipe(tap((event) => {
      if (event instanceof HttpResponse) {
        this.activeRequests++;
        this.checkHideLoader();
      }
    }, () => {
      this.activeRequests++;
      this.checkHideLoader();
    }), finalize(() => {
      this.pendingRequests--;
      this.checkHideLoader();
    }));
  }
  checkHideLoader() {
    if (!this.pendingRequests) {
      this.loaderService.hide();
    }
  }
  isExcludedUrl(url) {
    const excludedUrls = [
      "/api/Auth/GetRefreshAccessToken",
      "/api/excluded-url-2",
      "/api/Notification/GetCitizenUserNotificationviewmore",
      "/api/Notification/UpdateCitizenUserReadNotification"
      // Add more excluded URLs as needed
    ];
    return excludedUrls.some((excludedUrl) => url.includes(excludedUrl));
  }
  static {
    this.\u0275fac = function HttpLoaderInterceptor_Factory(t) {
      return new (t || _HttpLoaderInterceptor)(\u0275\u0275inject(LoaderService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _HttpLoaderInterceptor, factory: _HttpLoaderInterceptor.\u0275fac });
  }
};

// src/app/common/component/toast/toast.module.ts
var ToastModule = class _ToastModule {
  static {
    this.\u0275fac = function ToastModule_Factory(t) {
      return new (t || _ToastModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ToastModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule] });
  }
};

// src/app/app.module.ts
var AppModule = class _AppModule {
  static {
    this.\u0275fac = function AppModule_Factory(t) {
      return new (t || _AppModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppModule, bootstrap: [AppComponent] });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ providers: [
      provideClientHydration(),
      provideHttpClient(withFetch()),
      AuthGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpLoaderInterceptor,
        multi: true
      }
    ], imports: [
      BrowserModule,
      AppRoutingModule,
      LayoutModule,
      HttpClientModule,
      LoaderModule,
      ToastModule,
      BrowserAnimationsModule
    ] });
  }
};

// src/app/app.module.server.ts
var AppServerModule = class _AppServerModule {
  static {
    this.\u0275fac = function AppServerModule_Factory(t) {
      return new (t || _AppServerModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppServerModule, bootstrap: [AppComponent] });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      AppModule,
      ServerModule
    ] });
  }
};

export {
  AppServerModule
};
//# sourceMappingURL=chunk-L5DFIKDT.mjs.map
