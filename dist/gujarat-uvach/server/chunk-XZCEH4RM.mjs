import './polyfills.server.mjs';
import {
  BehaviorSubject,
  PLATFORM_ID,
  RendererFactory2,
  Title,
  finalize,
  isPlatformBrowser,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-5I3IBUKT.mjs";

// src/app/common/services/loader.ts
var LoaderService = class _LoaderService {
  constructor(titleService, rendererFactory, platformId) {
    this.titleService = titleService;
    this.rendererFactory = rendererFactory;
    this.platformId = platformId;
    this.showLoaderSubject = new BehaviorSubject(false);
    this.showLoaderTrans = new BehaviorSubject(false);
    this.showLoader$ = this.showLoaderSubject.asObservable();
    this.showLoaderTrans$ = this.showLoaderTrans.asObservable();
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  show(n) {
    this.showLoaderSubject.next(true);
    this.showLoaderTrans.next(n ? true : false);
    if (this.isBrowser) {
      const body = document.body;
      this.renderer.setStyle(body, "overflow", "hidden");
      this.renderer.setStyle(body, "position", "fixed");
      this.renderer.setStyle(body, "width", "100%");
      this.renderer.setStyle(body, "height", "100%");
    }
  }
  hide() {
    setTimeout(() => {
      this.showLoaderSubject.next(false);
      this.showLoaderTrans.next(false);
      if (this.isBrowser) {
        const body = document.body;
        this.renderer.removeStyle(body, "overflow");
        this.renderer.removeStyle(body, "position");
        this.renderer.removeStyle(body, "width");
        this.renderer.removeStyle(body, "height");
      }
    }, 500);
  }
  getTitle() {
    return this.titleService.getTitle();
  }
  intercept(request, next) {
    this.show(0);
    return next.handle(request).pipe(finalize(() => {
      this.hide();
    }));
  }
  static {
    this.\u0275fac = function LoaderService_Factory(t) {
      return new (t || _LoaderService)(\u0275\u0275inject(Title), \u0275\u0275inject(RendererFactory2), \u0275\u0275inject(PLATFORM_ID));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LoaderService, factory: _LoaderService.\u0275fac, providedIn: "root" });
  }
};

export {
  LoaderService
};
//# sourceMappingURL=chunk-XZCEH4RM.mjs.map
